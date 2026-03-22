import { useEffect, useRef } from "react";
import { websocketUrl } from "../lib/api";
import type { QuestionPaper } from "../store/slices/assignmentSlice";

type GenerationEvent = {
  assessmentId: string;
  message?: string;
  questionPaper?: QuestionPaper;
  status: string;
};

const CONNECT_FRAME = "CONNECT\naccept-version:1.2,1.1,1.0\nheart-beat:10000,10000\n\n\0";

const buildSubscribeFrame = (assignmentId: string) =>
  `SUBSCRIBE\nid:assignment-${assignmentId}\ndestination:/topic/questions/${assignmentId}\n\n\0`;

const splitFrames = (payload: string) =>
  payload
    .split("\0")
    .map((frame) => frame.trim())
    .filter(Boolean);

const parseFrame = (frame: string) => {
  const [command, ...rest] = frame.split("\n");
  const emptyLineIndex = rest.findIndex((line) => line === "");
  const headerLines =
    emptyLineIndex === -1 ? rest : rest.slice(0, emptyLineIndex);
  const bodyLines = emptyLineIndex === -1 ? [] : rest.slice(emptyLineIndex + 1);
  const headers = Object.fromEntries(
    headerLines.map((line) => {
      const separatorIndex = line.indexOf(":");

      return [
        line.slice(0, separatorIndex),
        line.slice(separatorIndex + 1),
      ];
    }),
  );

  return {
    body: bodyLines.join("\n"),
    command,
    headers,
  };
};

export function useAssignmentStatusSocket({
  assignmentIds,
  onStatusChange,
}: {
  assignmentIds: string[];
  onStatusChange: (event: GenerationEvent) => void;
}) {
  const callbackRef = useRef(onStatusChange);
  const socketRef = useRef<WebSocket | null>(null);
  const subscribedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    callbackRef.current = onStatusChange;
  }, [onStatusChange]);

  useEffect(() => {
    const subscribedIds = subscribedIdsRef.current;

    if (assignmentIds.length === 0) {
      socketRef.current?.close();
      socketRef.current = null;
      subscribedIds.clear();
      return;
    }

    const subscribeToAssignments = () => {
      const socket = socketRef.current;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }

      assignmentIds.forEach((assignmentId) => {
        if (subscribedIds.has(assignmentId)) {
          return;
        }

        socket.send(buildSubscribeFrame(assignmentId));
        subscribedIds.add(assignmentId);
      });
    };

    if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
      const socket = new WebSocket(websocketUrl);
      socketRef.current = socket;
      subscribedIds.clear();

      socket.addEventListener("open", () => {
        socket.send(CONNECT_FRAME);
      });

      socket.addEventListener("message", (event) => {
        if (typeof event.data !== "string") {
          return;
        }

        splitFrames(event.data).forEach((rawFrame) => {
          const frame = parseFrame(rawFrame);

          if (frame.command === "CONNECTED") {
            subscribeToAssignments();
            return;
          }

          if (frame.command !== "MESSAGE" || !frame.body) {
            return;
          }

          try {
            const payload = JSON.parse(frame.body) as GenerationEvent;
            callbackRef.current(payload);
          } catch {
            // Ignore malformed websocket payloads.
          }
        });
      });

      socket.addEventListener("close", () => {
        subscribedIds.clear();
      });
    } else {
      subscribeToAssignments();
    }

    return () => {
      const socket = socketRef.current;

      if (!socket) {
        return;
      }

      const activeIds = new Set(assignmentIds);
      subscribedIds.forEach((id) => {
        if (activeIds.has(id)) {
          return;
        }

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(`UNSUBSCRIBE\nid:assignment-${id}\n\n\0`);
        }

        subscribedIds.delete(id);
      });
    };
  }, [assignmentIds]);
}
