export const DummyEvaluationQuestionEnum = [
  "COURSE",
  "INSTRUCTOR",
  "TA",
] as const;
export const dummyEvaluationQuestions = [
  {
    questionId: "667f083078bb2ef8d03fa33a",
    type: DummyEvaluationQuestionEnum[0],
    question: {
      en: "The course was well-structured",
      ar: "المقرر كان منظمًا بشكل جيد",
    },
  },
  {
    questionId: "667f083078bb2ef8d03fa33a",
    type: DummyEvaluationQuestionEnum[1],
    question: {
      en: "The instructor was knowledgeable",
      ar: "كان المحاضر ملمًا بالموضوع",
    },
  },
  {
    questionId: "667f083078bb2ef8d03fa33a",
    type: DummyEvaluationQuestionEnum[2],
    question: {
      en: "The TA was helpful",
      ar: "كان المعيد مفيدًا",
    },
  },
];

export const dummyCourseEvaluationQuestions = dummyEvaluationQuestions.filter(
  (question) => question.type === DummyEvaluationQuestionEnum[0]
);
export const dummyInstructorEvaluationQuestions =
  dummyEvaluationQuestions.filter(
    (question) => question.type === DummyEvaluationQuestionEnum[1]
  );
export const dummyTAEvaluationQuestions = dummyEvaluationQuestions.filter(
  (question) => question.type === DummyEvaluationQuestionEnum[2]
);
