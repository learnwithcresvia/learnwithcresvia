const practiceQuestions = [
  // ---------------- PYTHON ----------------
  {
    id: 1,
    language: "python",
    title: "Print Hello",
    description: "Print Hello",
    expectedOutput: "Hello",
    commonMistakes: [{ match: "Print(", hint: "Python is case-sensitive" }]
  },
  {
    id: 2,
    language: "python",
    title: "Print Name",
    description: "Print your name",
    expectedOutput: "YourName",
    commonMistakes: []
  },
  {
    id: 3,
    language: "python",
    title: "Add Two Numbers",
    description: "Print sum of 2 and 3",
    expectedOutput: "5",
    commonMistakes: []
  },
  {
    id: 4,
    language: "python",
    title: "Multiply",
    description: "Print product of 4 and 5",
    expectedOutput: "20",
    commonMistakes: []
  },
  {
    id: 5,
    language: "python",
    title: "If Condition",
    description: "Print Yes if 5 > 3",
    expectedOutput: "Yes",
    commonMistakes: [{ match: "If", hint: "Use lowercase if" }]
  },

  // ---------------- JAVASCRIPT ----------------
  {
    id: 11,
    language: "javascript",
    title: "Print Hello",
    description: "Print Hello",
    expectedOutput: "Hello",
    commonMistakes: [{ match: "Console.log", hint: "JavaScript is case-sensitive" }]
  },
  {
    id: 12,
    language: "javascript",
    title: "Print Name",
    description: "Print your name",
    expectedOutput: "YourName",
    commonMistakes: []
  },
  {
    id: 13,
    language: "javascript",
    title: "Add Numbers",
    description: "Print sum of 2 and 3",
    expectedOutput: "5",
    commonMistakes: []
  },
  {
    id: 14,
    language: "javascript",
    title: "Multiply",
    description: "Print product of 4 and 5",
    expectedOutput: "20",
    commonMistakes: []
  },
  {
    id: 15,
    language: "javascript",
    title: "If Condition",
    description: "Print Yes if 5 > 3",
    expectedOutput: "Yes",
    commonMistakes: []
  }
];

export default practiceQuestions;
