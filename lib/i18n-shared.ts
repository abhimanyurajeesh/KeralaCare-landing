import en from "@/locales/en.json";
import ml from "@/locales/ml.json";

const dictionaries = { en, ml } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries.en;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${P extends "" ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

export type TranslationKey = Paths<Dictionary>;

// Get the type of a nested property in an object type using a dot-notation path
export type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : never;

export const languages = [
  { display: "English", code: "en" },
  { display: "മലയാളം", code: "ml" },
] as const satisfies { display: string; code: Locale }[];

export const getDictionary = (locale: Locale) => dictionaries[locale];

export type TranslationFunction = <K extends TranslationKey>(
  key: K
) => PathValue<Dictionary, K>;
