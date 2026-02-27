import { Heart, Navigation } from 'lucide-react';

interface HeroSectionProps {
  image: string;
}

export function HeroSection({ image }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Wedding background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="animate-fade-in">
          {/* Toque Árabe / Bendición */}
          <div className="mb-6 flex flex-col items-center">
            <p
              className="text-3xl md:text-5xl text-[#D4AF37] drop-shadow-lg font-serif mb-2"
              dir="rtl"
              style={{ fontFamily: '"Amiri", "Scheherazade New", serif', lineHeight: '1.5' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-sm md:text-base text-[#E8C4B8] font-light tracking-widest uppercase mt-2">
              Con la bendición de Allah
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-2 drop-shadow-lg flex flex-col md:block items-center justify-center gap-2">
            Sohayb <span className="text-[#D4AF37] px-2 md:inline block">&</span> Kawthar
          </h1>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-[#D4AF37] opacity-60" />
            <p className="text-xl md:text-2xl text-[#E8C4B8] font-light tracking-widest drop-shadow-md">
              05 · 04 · 2026
            </p>
            <div className="h-px w-16 bg-[#D4AF37] opacity-60" />
          </div>

          <p className="text-lg md:text-xl font-light tracking-wide mb-10 drop-shadow-md max-w-lg mx-auto">
            Nos casamos y sería un honor para nosotros celebrar este momento único contigo
          </p>

          <a
            href="https://maps.apple/p/v44wECx~rngHfs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full hover:bg-white/20 hover:border-white/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            <Navigation className="w-5 h-5 text-[#D4AF37]" strokeWidth={2.5} />
            <span className="font-medium tracking-wide">Cómo llegar (Apple Maps)</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
