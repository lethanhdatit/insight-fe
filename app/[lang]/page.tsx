import MysticalForm from "@/components/mystical-form";
import AncientClock from "@/components/ancient-clock";
import { getDictionary } from "./dictionaries";
import { Locale } from "@/lib/i18n/locales";
import UserMenu from "@/components/UserMenu";
import HeaderSpacer from "@/components/HeaderSpacer";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);  

  return (
    <>
      {/* Header */}
      <header
        id="main-header"
        className="fixed top-0 left-0 w-full z-30 bg-[var(--parchment)]/90 backdrop-blur flex items-center px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 shadow ancient-glow h-auto"
        style={{ minHeight: "unset", maxHeight: "none" }}
      >
        {/* Bên trái */}
        <div className="flex items-center">
          <UserMenu dictionary={dictionary} />
        </div>
        {/* Khoảng trống ở giữa */}
        <div className="flex-1" />
        {/* Bên phải */}
        <div className="flex items-center h-full">
          <AncientClock
            dictionary={dictionary}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full"
          />
        </div>
      </header>

      {/* Spacer để set margin-top cho main */}
      <HeaderSpacer />

      <main
        id="main-content"
        className="min-h-screen relative"
        // Xóa style marginTop cứng!
      >
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

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="ancient-font text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 ancient-text-glow mb-4">
              {dictionary.title}
            </h1>
            <p className="text-lg md:text-xl text-amber-800 ancient-font max-w-3xl mx-auto font-medium">
              {dictionary.subtitle}
            </p>
          </div>

          {/* Ancient Book Container */}
          <div className="flex justify-center w-full">
            <MysticalForm dictionary={dictionary} />
          </div>
        </div>
      </main>
    </>
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
