import { Inter, Cinzel, Noto_Serif_SC } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { getLangFromSession } from "@/lib/server";
import LanguageSelectPopup from "@/components/LanguageSelectPopup";
import Footer from "@/components/Footer";
import { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/app/[lang]/dictionaries";
import HeaderSpacer from "@/components/HeaderSpacer";
import UserMenu from "@/components/UserMenu";
import AncientClock from "@/components/ancient-clock";

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

        <header
          id="main-header"
          className="fixed top-0 left-0 w-full z-30 bg-[var(--parchment)]/90 backdrop-blur flex items-center px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 shadow ancient-glow h-auto"
          style={{ minHeight: "unset", maxHeight: "none" }}
        >
          <div className="flex items-center">
            <UserMenu dictionary={dictionary} />
          </div>
          <div className="flex-1" />
          <div className="flex items-center h-full">
            <AncientClock
              dictionary={dictionary}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full"
            />
          </div>
        </header>

        <HeaderSpacer />

        <main id="main-content" className="min-h-screen relative">
          <div className="absolute top-20 left-12 text-6xl opacity-20 floating-ancient">
            🏮
          </div>

          <div
            className="absolute bottom-12 right-12 text-5xl opacity-20 floating-ancient"
            style={{ animationDelay: "2s" }}
          >
            🐉
          </div>

          {["🐮", "🐯", "🐱", "🐍", "🐴", "🐑", "🐵", "🐔", "🐶", "🐷"].map(
            (icon, index) => {
              const position = generateRandomPosition();
              return (
                <div
                  key={index}
                  className="absolute text-5xl opacity-20 floating-ancient"
                  style={{
                    ...position,
                    animationDelay: generateRandomDelay(),
                  }}
                >
                  {icon}
                </div>
              );
            }
          )}

          <div
            className="absolute top-1/2 left-14 text-4xl opacity-20 floating-ancient"
            style={{ animationDelay: "4s" }}
          >
            ☯️
          </div>

          <div
            className="absolute bottom-1/2 right-12 text-4xl opacity-20 floating-ancient"
            style={{ animationDelay: "4s" }}
          >
            🐭
          </div>
          {children}
        </main>

        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}

const spreadFactor = 0.85;

const generateRandomPosition = () => {
  const top = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10;
  const left = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10;
  return { top: `${top}%`, left: `${left}%` };
};

const generateRandomDelay = () => {
  const delay = Math.random() * 7 + 1;
  return `${delay}s`;
};
