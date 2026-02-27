import { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no';
  numberOfGuests: number;
  message: string;
  timestamp: string;
}

export function GuestList() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSVPs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1553dea5/rsvp`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar las confirmaciones');
      }

      setRsvps(data.data || []);
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar las confirmaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const attendingGuests = rsvps.filter(rsvp => rsvp.attendance === 'yes');
  const notAttendingGuests = rsvps.filter(rsvp => rsvp.attendance === 'no');
  const totalGuests = attendingGuests.reduce((sum, rsvp) => sum + rsvp.numberOfGuests, 0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-[#C9A870]" />
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Lista de Invitados
            </h2>
            <p className="text-gray-600">
              Panel de administración para ver las confirmaciones
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmados</p>
                  <p className="text-3xl font-bold text-green-600">{attendingGuests.length}</p>
                  <p className="text-xs text-gray-500 mt-1">{totalGuests} personas en total</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">No Asisten</p>
                  <p className="text-3xl font-bold text-red-600">{notAttendingGuests.length}</p>
                </div>
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#D4AF37]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Respuestas</p>
                  <p className="text-3xl font-bold text-[#C9A870]">{rsvps.length}</p>
                </div>
                <Users className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
            <Button
              onClick={fetchRSVPs}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>

          {/* Guest List */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#C9A870]" />
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">
                {error}
              </div>
            ) : rsvps.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Aún no hay confirmaciones de asistencia</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#D4AF37] to-[#C9A870] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Asistencia</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">N° Personas</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Mensaje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {rsvp.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {rsvp.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {rsvp.phone || '-'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {rsvp.attendance === 'yes' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Sí asiste
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3 mr-1" />
                              No asiste
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900">
                          {rsvp.attendance === 'yes' ? rsvp.numberOfGuests : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {rsvp.message || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
