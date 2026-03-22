import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { QuestionPaper, QuestionPaperQuestion } from "../../store/slices/assignmentSlice";

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
  },
  answerKeyTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 28,
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
  return (
    <Document
      author="VedaAI"
      creator="VedaAI"
      subject={questionPaper.subject}
      title={`${questionPaper.subject} Question Paper`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.schoolName}>{questionPaper.schoolName}</Text>
        <Text style={styles.centeredLine}>Subject: {questionPaper.subject}</Text>
        <Text style={styles.centeredLine}>Class: {questionPaper.className}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.bodyText}>
            Time Allowed: {questionPaper.timeAllowed} minutes
          </Text>
          <Text style={styles.bodyText}>
            Maximum Marks: {questionPaper.totalMarks}
          </Text>
        </View>

        <Text style={[styles.bodyText, { marginTop: 16 }]}>
          {questionPaper.generalInstruction}
        </Text>

        <View style={styles.infoBlock}>
          <Text style={styles.bodyText}>Name: ____________________</Text>
          <Text style={styles.bodyText}>Roll Number: ____________________</Text>
          <Text style={styles.bodyText}>
            Class: {questionPaper.className} Section: ____________________
          </Text>
        </View>

        {questionPaper.sections.map((section) => (
          <View key={`${section.title}-${section.questionType}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionType}>
              {toTitleCase(section.questionType.replaceAll("_", " "))}
            </Text>
            <Text style={styles.sectionInstruction}>{section.instruction}</Text>

            {section.questions.map((question) => (
              <QuestionItem
                key={`${section.title}-${question.questionNumber}`}
                question={question}
              />
            ))}
          </View>
        ))}

        <Text style={styles.footerText}>End of Question Paper</Text>

        <Text style={styles.answerKeyTitle}>Answer Key:</Text>
        {questionPaper.answerKey.map((question) => (
          <Text key={`answer-${question.questionNumber}`} style={styles.answerItem}>
            {question.questionNumber}. {question.answer}
          </Text>
        ))}
      </Page>
    </Document>
  );
}

function QuestionItem({ question }: { question: QuestionPaperQuestion }) {
  return (
    <View style={styles.questionItem}>
      <Text>
        {question.questionNumber}. [{toTitleCase(question.difficulty)}]{" "}
        {stripDifficultyTag(question.questionText)} [{question.marks} Marks]
      </Text>
      {question.options?.map((option, index) => (
        <Text key={`${question.questionNumber}-${option}`} style={styles.optionItem}>
          {String.fromCharCode(65 + index)}. {option}
        </Text>
      ))}
    </View>
  );
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripDifficultyTag(value: string) {
  return value.replace(/^\s*\[[^\]]+\]\s*/u, "");
}
