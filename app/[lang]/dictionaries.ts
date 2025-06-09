// app/[lang]/dictionaries.ts
import 'server-only';
import { Locale } from '@/lib/i18n/locales';

type Dictionary = typeof import('./dictionaries/vi.json');

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () => import('./dictionaries/vi.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale];
  if (!loader) throw new Error(`No dictionary found for locale: ${locale}`);
  return loader();
};
