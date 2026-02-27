import { Calendar, Clock, MapPin } from 'lucide-react';

export function EventDetails() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-800">
          Detalles del Evento
        </h2>
        <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12" />

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Fecha */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-[#F4E4D7] to-[#FFE5E5] shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <Calendar className="w-8 h-8 text-[#C9A870]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fecha</h3>
            <p className="text-gray-700">Domingo</p>
            <p className="text-2xl font-bold text-[#C9A870] my-2">5 de Abril</p>
            <p className="text-gray-700">2026</p>
          </div>

          {/* Hora */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-[#F4E4D7] to-[#FFE5E5] shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <Clock className="w-8 h-8 text-[#C9A870]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Hora</h3>
            <p className="text-2xl font-bold text-[#C9A870] my-4">21:00</p>
            <p className="text-gray-700">Noche</p>
          </div>

          {/* Lugar */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-[#F4E4D7] to-[#FFE5E5] shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <MapPin className="w-8 h-8 text-[#C9A870]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Lugar</h3>
            <p className="text-lg font-bold text-[#C9A870]">Carpa Thissaghnas</p>
            <p className="text-gray-700 mt-2">Nador, Marruecos</p>
          </div>
        </div>

        {/* Map Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 italic">
            Te esperamos para compartir este día tan especial. 
            ¡Tu presencia es nuestro mejor regalo!
          </p>
        </div>
      </div>
    </section>
  );
}
