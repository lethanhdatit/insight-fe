import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/i18n/locales";

export default async function ProfilePage({ params }: { params: { lang: Locale } }) {
  var { lang } = await params;
  
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <h1>{dictionary.profile.title}</h1>
      {/* ... */}
    </main>
  );
}