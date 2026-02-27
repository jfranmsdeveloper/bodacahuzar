import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#D4AF37] to-[#C9A870] text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <Heart className="w-8 h-8 mx-auto mb-4 fill-white" />
        <p className="text-2xl font-serif mb-2">Sohayb & Kawthar</p>
        <p className="text-sm opacity-90 mb-4">5 de Abril de 2026</p>
        <div className="border-t border-white/30 pt-6 mt-6">
          <p className="text-sm opacity-75">
            Con todo nuestro amor, esperamos celebrar este día especial contigo
          </p>
        </div>
      </div>
    </footer>
  );
}
