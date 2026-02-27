import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F4E4D7] to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-800">
          Cuenta Regresiva
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          El gran día está cada vez más cerca
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-[#D4AF37]"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#C9A870] mb-2">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-600 uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
