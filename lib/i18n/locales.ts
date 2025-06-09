// src/i18n/locales.ts
export const locales = ['vi'] as const;
export type Locale = typeof locales[number];

export enum LocaleEnum {
  VI = 'vi',
}
