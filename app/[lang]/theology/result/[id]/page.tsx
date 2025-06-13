import { getDictionary } from "@/app/[lang]/dictionaries";
import TheologyResultClient from "./TheologyResultClient";
import { Locale } from "@/lib/i18n/locales";

export default async function TheologyResultPage({ params }: { params: { lang: Locale, id: string } }) {
   var { lang, id } = await params;
  const dictionary = await getDictionary(lang);

  return <TheologyResultClient lang={lang} id={id} dictionary={dictionary} />;
}