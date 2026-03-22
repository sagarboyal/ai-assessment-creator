import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TextProps } from "@react-pdf/renderer";
import type { QuestionPaper, QuestionPaperQuestion } from "../../store/slices/assignmentSlice";

const FONT_FAMILY_BENGALI = "PdfNotoSansBengali";
const FONT_FAMILY_DEVANAGARI = "PdfNotoSansDevanagari";

let bengaliFontRegistered = false;
let devanagariFontRegistered = false;

function ensureBengaliFontRegistered() {
  if (bengaliFontRegistered) {
    return;
  }

  Font.register({
    family: FONT_FAMILY_BENGALI,
    fonts: [
      { src: "/fonts/noto-sans-bengali-bengali-400-normal.woff", fontWeight: 400 },
      { src: "/fonts/noto-sans-bengali-bengali-700-normal.woff", fontWeight: 700 },
    ],
  });

  bengaliFontRegistered = true;
}

function ensureDevanagariFontRegistered() {
  if (devanagariFontRegistered) {
    return;
  }

  Font.register({
    family: FONT_FAMILY_DEVANAGARI,
    fonts: [
      {
        src: "/fonts/noto-sans-devanagari-devanagari-400-normal.woff",
        fontWeight: 400,
      },
      {
        src: "/fonts/noto-sans-devanagari-devanagari-700-normal.woff",
        fontWeight: 700,
      },
    ],
  });

  devanagariFontRegistered = true;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#222222",
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.7,
    paddingBottom: 34,
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 800,
    textAlign: "center",
  },
  centeredLine: {
    fontSize: 13,
    fontWeight: 700,
    marginTop: 4,
    textAlign: "center",
  },
  metaRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  bodyText: {
    fontSize: 11,
  },
  infoBlock: {
    marginTop: 14,
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 14,
    textAlign: "center",
  },
  sectionType: {
    fontSize: 11,
    fontWeight: 700,
  },
  sectionInstruction: {
    color: "#666666",
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 3,
  },
  questionItem: {
    marginTop: 10,
  },
  optionItem: {
    marginLeft: 18,
    marginTop: 2,
  },
  footerText: {
    fontSize: 11,
    fontWeight: 700,
    marginTop: 22,
    textAlign: "center",
  },
  separatorPage: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#222222",
    display: "flex",
    fontFamily: "Helvetica",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  separatorTitle: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center",
  },
  separatorText: {
    color: "#666666",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  answerPage: {
    backgroundColor: "#ffffff",
    color: "#222222",
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.7,
    paddingBottom: 34,
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  answerKeyTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 8,
  },
  answerItem: {
    marginTop: 8,
  },
});

export function QuestionPaperPdfDocument({
  questionPaper,
}: {
  questionPaper: QuestionPaper;
}) {
  const fullText = collectQuestionPaperText(questionPaper);

  if (containsBengali(fullText)) {
    ensureBengaliFontRegistered();
  }

  if (containsDevanagari(fullText)) {
    ensureDevanagariFontRegistered();
  }

  return (
    <Document
      author="VedaAI"
      creator="VedaAI"
      subject={questionPaper.subject}
      title={`${questionPaper.subject} Question Paper`}
    >
      <Page size="A4" style={styles.page}>
        <LocalizedText style={styles.schoolName}>{questionPaper.schoolName}</LocalizedText>
        <LocalizedText style={styles.centeredLine}>
          Subject: {questionPaper.subject}
        </LocalizedText>
        <LocalizedText style={styles.centeredLine}>
          Class: {questionPaper.className}
        </LocalizedText>

        <View style={styles.metaRow}>
          <LocalizedText style={styles.bodyText}>
            Time Allowed: {questionPaper.timeAllowed} minutes
          </LocalizedText>
          <LocalizedText style={styles.bodyText}>
            Maximum Marks: {questionPaper.totalMarks}
          </LocalizedText>
        </View>

        <LocalizedText style={[styles.bodyText, { marginTop: 16 }]}>
          {questionPaper.generalInstruction}
        </LocalizedText>

        <View style={styles.infoBlock}>
          <LocalizedText style={styles.bodyText}>Name: ____________________</LocalizedText>
          <LocalizedText style={styles.bodyText}>
            Roll Number: ____________________
          </LocalizedText>
          <LocalizedText style={styles.bodyText}>
            Class: {questionPaper.className} Section: ____________________
          </LocalizedText>
        </View>

        {questionPaper.sections.map((section) => (
          <View key={`${section.title}-${section.questionType}`} style={styles.section}>
            <LocalizedText style={styles.sectionTitle}>{section.title}</LocalizedText>
            <LocalizedText style={styles.sectionType}>
              {toTitleCase(section.questionType.replaceAll("_", " "))}
            </LocalizedText>
            <LocalizedText style={styles.sectionInstruction}>
              {section.instruction}
            </LocalizedText>

            {section.questions.map((question) => (
              <QuestionItem
                key={`${section.title}-${question.questionNumber}`}
                question={question}
              />
            ))}
          </View>
        ))}

        <LocalizedText style={styles.footerText}>End of Question Paper</LocalizedText>
      </Page>

      <Page size="A4" style={styles.separatorPage}>
        <LocalizedText style={styles.separatorTitle}>End of Question Paper</LocalizedText>
        <LocalizedText style={styles.separatorText}>
          Answer key starts on the next page for separate printing.
        </LocalizedText>
      </Page>

      <Page size="A4" style={styles.answerPage}>
        <LocalizedText style={styles.answerKeyTitle}>Answer Key:</LocalizedText>
        {questionPaper.answerKey.map((question) => (
          <LocalizedText
            key={`answer-${question.questionNumber}`}
            style={styles.answerItem}
          >
            {question.questionNumber}. {question.answer}
          </LocalizedText>
        ))}
      </Page>
    </Document>
  );
}

function QuestionItem({ question }: { question: QuestionPaperQuestion }) {
  return (
    <View style={styles.questionItem}>
      <LocalizedText>
        {question.questionNumber}. [{toTitleCase(question.difficulty)}]{" "}
        {stripDifficultyTag(question.questionText)} [{question.marks} Marks]
      </LocalizedText>
      {question.options?.map((option, index) => (
        <LocalizedText
          key={`${question.questionNumber}-${option}`}
          style={styles.optionItem}
        >
          {String.fromCharCode(65 + index)}. {option}
        </LocalizedText>
      ))}
    </View>
  );
}

function LocalizedText({
  children,
  style,
}: {
  children: string | number | (string | number)[] | undefined;
  style?: TextProps["style"];
}) {
  const text = Array.isArray(children) ? children.join("") : `${children ?? ""}`;
  const runs = splitByScript(text);

  return (
    <Text style={style}>
      {runs.map((run, index) => (
        <Text
          key={`${run.script}-${index}`}
          style={run.script === "bengali"
            ? { fontFamily: FONT_FAMILY_BENGALI }
            : run.script === "devanagari"
              ? { fontFamily: FONT_FAMILY_DEVANAGARI }
              : undefined}
        >
          {run.text}
        </Text>
      ))}
    </Text>
  );
}

function splitByScript(value: string) {
  const runs: Array<{ script: "bengali" | "devanagari" | "latin"; text: string }> = [];

  for (const char of value) {
    const script = detectScript(char);
    const lastRun = runs.at(-1);

    if (!lastRun || lastRun.script !== script) {
      runs.push({ script, text: char });
      continue;
    }

    lastRun.text += char;
  }

  return runs;
}

function detectScript(char: string): "bengali" | "devanagari" | "latin" {
  if (/[\u0980-\u09FF]/u.test(char)) {
    return "bengali";
  }

  if (/[\u0900-\u097F]/u.test(char)) {
    return "devanagari";
  }

  return "latin";
}

function containsBengali(value: string) {
  return /[\u0980-\u09FF]/u.test(value);
}

function containsDevanagari(value: string) {
  return /[\u0900-\u097F]/u.test(value);
}

function collectQuestionPaperText(questionPaper: QuestionPaper) {
  return [
    questionPaper.schoolName,
    questionPaper.subject,
    questionPaper.className,
    questionPaper.generalInstruction,
    ...questionPaper.sections.flatMap((section) => [
      section.title,
      section.questionType,
      section.instruction,
      ...section.questions.flatMap((question) => [
        question.questionText,
        question.answer,
        ...(question.options ?? []),
      ]),
    ]),
    ...questionPaper.answerKey.flatMap((question) => [
      question.questionText,
      question.answer,
      ...(question.options ?? []),
    ]),
  ].join(" ");
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripDifficultyTag(value: string) {
  return value.replace(/^\s*\[[^\]]+\]\s*/u, "");
}
