import { Inter, Cinzel, Noto_Serif_SC } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { getLangFromSession } from "@/lib/server";
import LanguageSelectPopup from "@/components/LanguageSelectPopup";
import Footer from "@/components/Footer";
import { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/app/[lang]/dictionaries";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});
const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
});

const metadata: {
  [key: string]: {
    title: string;
    description: string;
    keywords: string;
    openGraph: { title: string; description: string; type: string };
  };
} = {
  vi: {
    title: "Khám Phá Số Mệnh - Hành Trình Tâm Linh Cổ Xưa",
    description:
      "Khám phá số mệnh và giải mã những giấc mơ bí ẩn qua trí tuệ cổ xưa của Đông phương",
    keywords:
      "số mệnh, thần học, giải mơ, tâm linh, phong thủy, cổ xưa, đông phương",
    openGraph: {
      title: "Khám Phá Số Mệnh - Hành Trình Tâm Linh Cổ Xưa",
      description:
        "Khám phá số mệnh và giải mã những giấc mơ bí ẩn qua trí tuệ cổ xưa",
      type: "website",
    },
  },
  en: {
    title: "Discover Your Destiny - Ancient Spiritual Journey",
    description:
      "Explore your destiny and decode mysterious dreams through the ancient wisdom of the East",
    keywords:
      "destiny, theology, dream interpretation, spirituality, feng shui, ancient wisdom, east",
    openGraph: {
      title: "Discover Your Destiny - Ancient Spiritual Journey",
      description:
        "Explore your destiny and decode mysterious dreams through the ancient wisdom of the East",
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang || "vi";
  const currentMetadata = metadata[lang] || metadata.vi;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    openGraph: {
      title: currentMetadata.openGraph.title,
      description: currentMetadata.openGraph.description,
      type: currentMetadata.openGraph.type,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLangFromSession();

  const showLangPopup = !lang || !["vi", "en"].includes(lang);

  const dictionary = await getDictionary(lang ?? "vi");

  return (
    <html lang={lang || "vi"} className="ancient-theme">
      <Head>
        <title>{metadata[lang || "vi"].title}</title>
        <meta name="description" content={metadata[lang || "vi"].description} />
        <meta name="keywords" content={metadata[lang || "vi"].keywords} />
        <meta
          property="og:title"
          content={metadata[lang || "vi"].openGraph.title}
        />
        <meta
          property="og:description"
          content={metadata[lang || "vi"].openGraph.description}
        />
        <meta
          property="og:type"
          content={metadata[lang || "vi"].openGraph.type}
        />
        <meta name="generator" content="v0.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${inter.className} ${cinzel.variable} ${notoSerifSC.variable} min-h-screen`}
      >
        {showLangPopup && (
          <LanguageSelectPopup currentLang={lang} dictionary={dictionary} />
        )}
        {children}
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
