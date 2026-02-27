import { useState } from 'react';
import { Check, Users, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Guest {
  name: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no';
  numberOfGuests: number;
  message: string;
}

export function RSVPForm() {
  const [formData, setFormData] = useState<Guest>({
    name: '',
    email: '',
    phone: '',
    attendance: 'yes',
    numberOfGuests: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1553dea5/rsvp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la confirmación');
      }

      setSubmitted(true);
      
      // Resetear después de 5 segundos
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          attendance: 'yes',
          numberOfGuests: 1,
          message: '',
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError(err instanceof Error ? err.message : 'Error al enviar la confirmación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F4E4D7]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-[#C9A870]" />
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Confirma tu Asistencia
            </h2>
            <p className="text-gray-600">
              Por favor, completa el formulario para confirmar tu presencia en nuestra boda
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-[#D4AF37]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Nombre */}
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                    placeholder="+212..."
                  />
                </div>

                {/* Asistencia */}
                <div>
                  <Label className="text-gray-700 mb-3 block">
                    ¿Confirmas tu asistencia? *
                  </Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value: 'yes' | 'no') =>
                      setFormData({ ...formData, attendance: value })
                    }
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#F4E4D7] transition-colors">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="cursor-pointer flex-1">
                        Sí, asistiré con mucho gusto
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#F4E4D7] transition-colors">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="cursor-pointer flex-1">
                        Lamentablemente no podré asistir
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Número de invitados */}
                {formData.attendance === 'yes' && (
                  <div>
                    <Label htmlFor="guests" className="text-gray-700">
                      Número de personas (incluyéndote)
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.numberOfGuests}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })
                      }
                      className="mt-2"
                    />
                  </div>
                )}

                {/* Mensaje */}
                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    Mensaje para los novios (opcional)
                  </Label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A870]"
                    placeholder="Comparte tus mejores deseos..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C9A870] hover:from-[#C9A870] hover:to-[#D4AF37] text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Confirmar Asistencia'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  ¡Confirmación Recibida!
                </h3>
                <p className="text-gray-600">
                  Gracias por confirmar tu asistencia. ¡Nos vemos en la boda!
                </p>
              </div>
            )}
          </div>

          {/* Nota informativa */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              * Campos obligatorios. Por favor, confirma tu asistencia antes del 20 de Marzo de 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}