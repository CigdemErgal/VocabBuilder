import type { VerbType, WordCategory, WordItem } from "../types/word";

export type DictionaryWord = WordItem & {
  translation: string;
  nextReview: string;
};

export type RecommendedWord = {
  id: string;
  word: string;
  translation: string;
  category: WordCategory;
  reason: string;
};

export type TrainingTask = {
  id: string;
  prompt: string;
  answer: string;
  options: string[];
};

export const dictionaryCategories: Array<{
  label: string;
  value: WordCategory;
}> = [
  { label: "Verb", value: "verb" },
  { label: "Participle", value: "participle" },
  { label: "Noun", value: "noun" },
  { label: "Adjective", value: "adjective" },
  { label: "Pronoun", value: "pronoun" },
  { label: "Numerals", value: "numerals" },
  { label: "Adverb", value: "adverb" },
  { label: "Preposition", value: "preposition" },
  { label: "Conjunction", value: "conjunction" },
  { label: "Phrasal verb", value: "phrasal verb" },
  { label: "Functional phrase", value: "functional phrase" },
];

export const verbTypeOptions: Array<{
  label: string;
  value: VerbType;
}> = [
  { label: "Regular", value: "regular" },
  { label: "Irregular", value: "irregular" },
];

export const mockDictionaryWords: DictionaryWord[] = [
  {
    id: "1",
    word: "achieve",
    ua: "basarmak",
    translation: "basarmak",
    category: "verb",
    verbType: "regular",
    progress: 82,
    nextReview: "Today",
  },
  {
    id: "2",
    word: "although",
    ua: "ragmen",
    translation: "ragmen",
    category: "conjunction",
    progress: 54,
    nextReview: "Tomorrow",
  },
  {
    id: "3",
    word: "insight",
    ua: "ongoru",
    translation: "ongoru",
    category: "noun",
    progress: 67,
    nextReview: "Mon",
  },
  {
    id: "4",
    word: "keep up",
    ua: "ayak uydurmak",
    translation: "ayak uydurmak",
    category: "phrasal verb",
    progress: 38,
    nextReview: "Tue",
  },
  {
    id: "5",
    word: "precise",
    ua: "net",
    translation: "net",
    category: "adjective",
    progress: 76,
    nextReview: "Wed",
  },
  {
    id: "6",
    word: "wander",
    ua: "dolasmak",
    translation: "dolasmak",
    category: "verb",
    verbType: "regular",
    progress: 24,
    nextReview: "Thu",
  },
];

export const mockRecommendedWords: RecommendedWord[] = [
  {
    id: "r1",
    word: "thrive",
    translation: "gelismek",
    category: "verb",
    reason: "Fits your recent training mistakes",
  },
  {
    id: "r2",
    word: "meanwhile",
    translation: "bu sirada",
    category: "adverb",
    reason: "Useful connector for writing prompts",
  },
  {
    id: "r3",
    word: "reliable",
    translation: "guvenilir",
    category: "adjective",
    reason: "High-frequency adjective in interviews",
  },
];

export const mockTrainingTasks: TrainingTask[] = [
  {
    id: "t1",
    prompt: "Choose the best translation for 'achieve'.",
    answer: "basarmak",
    options: ["beklemek", "basarmak", "yuzmek", "saklamak"],
  },
  {
    id: "t2",
    prompt: "Choose the best translation for 'reliable'.",
    answer: "guvenilir",
    options: ["guvenilir", "gizli", "hizli", "ince"],
  },
  {
    id: "t3",
    prompt: "Choose the best translation for 'meanwhile'.",
    answer: "bu sirada",
    options: ["bu sirada", "birdenbire", "hemen", "nadiren"],
  },
];
