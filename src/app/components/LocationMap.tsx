import { Map as MapIcon, Navigation } from 'lucide-react';

export function LocationMap() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#FAF4F0]">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-800">
                    Ubicación
                </h2>
                <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12" />

                <div className="bg-white p-2 md:p-4 rounded-2xl shadow-xl">
                    <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3] md:aspect-[21/9]">
                        <iframe
                            title="Mapa de la ubicación"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            src="https://maps.google.com/maps?q=35.125404,-2.915966&hl=es&z=15&output=embed"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="mt-8 mb-4 flex flex-col items-center justify-center text-center space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <MapIcon className="w-5 h-5 text-[#C9A870]" />
                            Carpa Thissaghnas
                        </h3>
                        <p className="text-gray-600 max-w-lg">
                            La Rocade Méditerranéenne, Bouarg, Marruecos
                        </p>

                        <a
                            href="https://maps.apple/p/v44wECx~rngHfs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 bg-[#C9A870] text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 shadow-lg hover:bg-[#b08d57] hover:-translate-y-1 transition-all duration-300"
                        >
                            <Navigation className="w-5 h-5" />
                            Abrir en Apple Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
