export type WordCategory =
  | "verb"
  | "participle"
  | "noun"
  | "adjective"
  | "pronoun"
  | "numerals"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "phrasal verb"
  | "functional phrase";

export type VerbType = "regular" | "irregular";

export type WordItem = {
  id: string;
  word: string;
  ua: string;
  category: WordCategory;
  verbType?: VerbType;
  progress?: number;
};

export type CreateWordPayload = {
  word: string;
  ua: string;
  category: WordCategory;
  verbType?: VerbType;
};
