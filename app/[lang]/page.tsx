import MysticalForm from "@/components/mystical-form"
import AncientClock from "@/components/ancient-clock"
import { getDictionary } from './dictionaries';
import { Locale, locales  } from '@/lib/i18n/locales';
import UserMenu from "@/components/UserMenu";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale }
}) {

  const { lang } = await params

  const dictionary = await getDictionary(lang);

  const spreadFactor = 0.85;

  const generateRandomPosition = () => {
    const top = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10; // Random top position near edges
    const left = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10; // Random left position near edges
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomDelay = () => {
    const delay = Math.random() * 7 + 1; // Random delay between 1s and 8s
    return `${delay}s`;
  };

  // TODO: Lấy user thực tế từ session/auth, tạm thời để null
  const user = null; // hoặc { name: "Nguyễn Văn A" }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[var(--parchment)]/90 backdrop-blur flex items-center justify-between px-6 py-3 shadow ancient-glow border-[var(--ancient-bronze)]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[var(--ancient-gold)] border-2 border-[var(--ancient-bronze)] shadow ancient-glow p-1">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain rounded-full" />
          </div>
          <span className="font-bold text-2xl ancient-font text-[var(--ancient-red)] drop-shadow ancient-text-glow tracking-widest select-none">
            Insight App
          </span>
        </div>
        {/* UserMenu chỉ là client component nhỏ */}
        <UserMenu user={user} />
      </header>

      <main className="min-h-screen relative pt-24">
        {/* Ancient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100"></div>

        <div className="absolute top-20 left-12 text-6xl opacity-20 floating-ancient">🏮</div>

        <div
          className="absolute bottom-12 right-12 text-5xl opacity-20 floating-ancient"
          style={{ animationDelay: "2s" }}
        >
          🐉
        </div>      

        {['🐮', '🐯', '🐱', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'].map((icon, index) => {
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
        })}

        <div className="absolute top-1/2 left-14 text-4xl opacity-20 floating-ancient" style={{ animationDelay: "4s" }}>
          ☯️
        </div>

        <div className="absolute bottom-1/2 right-12 text-4xl opacity-20 floating-ancient" style={{ animationDelay: "4s" }}>
          🐭
        </div>

        {/* Ancient Clock */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-20">
          <AncientClock dictionary={dictionary}/>
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
  )
}
