import { HeroSection } from './components/HeroSection';
import { Countdown } from './components/Countdown';
import { EventDetails } from './components/EventDetails';
import { LocationMap } from './components/LocationMap';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
// import { GuestList } from './components/GuestList'; // Descomenta esta línea para ver la lista de invitados

export default function App() {
  // Fecha de la boda: Domingo 5 de Abril de 2026 a las 21:00
  const weddingDate = new Date('2026-04-05T21:00:00');

  const heroImage = "https://images.unsplash.com/photo-1605485236765-3362f241fa7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBnb2xkZW4lMjByb3NlcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyMjE1MDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="min-h-screen font-sans">
      <HeroSection image={heroImage} />
      <Countdown targetDate={weddingDate} />
      <EventDetails />
      <LocationMap />
      <RSVPForm />
      {/* Descomenta la siguiente línea para ver el panel de administración con la lista de invitados */}
      {/* <GuestList /> */}
      <Footer />
    </div>
  );
}