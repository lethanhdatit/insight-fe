// src/i18n/locales.ts
export const locales = ['vi', 'en'] as const;
export type Locale = typeof locales[number];

export enum LocaleEnum {
  VI = 'vi',
  EN = 'en'
}
