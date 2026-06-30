import type { VerbType, WordCategory } from "../types/word";
import type { BackendWord } from "../api/words";

export type DictionaryWord = {
  id: string;
  word: string;
  translation: string;
  ua: string;
  category: WordCategory;
  verbType?: VerbType;
  progress: number;
};

export function mapBackendWordToDictionaryWord(
  item: BackendWord,
): DictionaryWord {
  return {
    id: item._id,
    word: item.en,
    translation: item.ua,
    ua: item.ua,
    category: item.category,
    verbType:
      item.category === "verb"
        ? item.isIrregular
          ? "irregular"
          : "regular"
        : undefined,
    progress: item.progress ?? 0,
  };
}
