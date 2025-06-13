import MysticalForm from "@/components/mystical-form";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/i18n/locales";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>   

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="ancient-font text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 ancient-text-glow mb-4">
            {dictionary.title}
          </h1>
          <p className="text-lg md:text-xl text-amber-800 ancient-font max-w-3xl mx-auto font-medium">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="flex justify-center w-full">
          <MysticalForm dictionary={dictionary} />
        </div>
      </div>
    </>
  );
}