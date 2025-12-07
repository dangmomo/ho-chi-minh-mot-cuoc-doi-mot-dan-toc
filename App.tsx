import React, { useState, useEffect } from 'react';
import { historicalData } from './utils/data';
import { VintageCard } from './components/VintageCard';
import { Navigation } from './components/Navigation';
import { Feather, BookOpen, Anchor } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(historicalData[0].id);

  // Intersection Observer to update active section in sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    historicalData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-vintage-paper text-vintage-dark font-body bg-paper-texture overflow-x-hidden selection:bg-vintage-red selection:text-white">
      
      {/* Sidebar Navigation */}
      <Navigation periods={historicalData} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="md:pl-72 transition-all duration-300">
        
        {/* Hero Section */}
        <header className="relative min-h-[90vh] flex items-center justify-center p-8 border-b-8 border-double border-vintage-dark/10">
           {/* Background Overlay */}
           <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hanoi/1920/1080')] bg-cover bg-center bg-fixed sepia-[0.6] opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vintage-paper/50 to-vintage-paper"></div>

           <div className="relative z-10 text-center max-w-4xl mx-auto border-4 border-double border-vintage-gold/50 p-10 md:p-16 bg-vintage-paper/80 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex justify-center text-vintage-red opacity-80">
                  <StarIcon />
              </div>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-vintage-dark mb-4 tracking-tight leading-tight">
                Hồ Chí Minh
              </h1>
              <h2 className="font-serif text-2xl md:text-3xl text-vintage-red italic mb-8 border-b border-vintage-dark/20 pb-4 inline-block">
                Một Cuộc Đời – Một Dân Tộc
              </h2>
              <p className="font-body text-lg md:text-xl text-vintage-dark/80 leading-relaxed max-w-2xl mx-auto italic">
                "Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành."
              </p>
              <div className="mt-8 font-script text-3xl text-vintage-gold">1890 - 1969</div>
              
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-vintage-dark/50"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-vintage-dark/50"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-vintage-dark/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-vintage-dark/50"></div>
           </div>

           <div className="absolute bottom-10 animate-bounce text-vintage-dark/50">
             <Feather size={32} />
           </div>
        </header>

        {/* Timeline Content */}
        <div className="max-w-5xl mx-auto px-6 py-16">
            {historicalData.map((period, index) => (
                <section 
                  key={period.id} 
                  id={period.id} 
                  className="mb-32 relative scroll-mt-20"
                >
                    {/* Period Header */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-vintage-gold/40"></div>
                        <span className="relative bg-vintage-paper px-6 py-2 font-serif text-3xl md:text-4xl font-bold text-vintage-red border-2 border-vintage-gold shadow-lg inline-block rounded-lg transform -rotate-1">
                            {period.period}
                        </span>
                        <h2 className="mt-6 font-serif text-3xl md:text-5xl font-bold text-vintage-dark relative inline-block">
                            {period.title}
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-vintage-red"></span>
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-vintage-dark/70 font-body italic max-w-3xl mx-auto">
                            {period.summary}
                        </p>
                    </div>

                    {/* Events */}
                    <div className="relative">
                       {/* Center line for desktop */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-vintage-dark/10 hidden md:block"></div>

                        {period.events.map((event, eventIdx) => (
                            <VintageCard key={eventIdx} event={event} isEven={eventIdx % 2 === 0} />
                        ))}
                    </div>

                    {/* Section Divider Icon */}
                    <div className="flex justify-center mt-20 opacity-40">
                       {index % 2 === 0 ? <BookOpen size={40} /> : <Anchor size={40} />}
                    </div>
                </section>
            ))}
        </div>

        {/* Footer */}
        <footer className="bg-vintage-dark text-vintage-paper py-16 px-6 text-center border-t-8 border-vintage-gold">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl mb-6 text-vintage-gold">Hồ Chí Minh</h2>
                <p className="font-body italic text-vintage-sepia mb-8">
                  "Dân tộc ta, nhân dân ta, non sông đất nước ta đã sinh ra Hồ Chủ tịch, người anh hùng dân tộc vĩ đại, và chính Người đã làm rạng rỡ dân tộc ta, nhân dân ta và non sông đất nước ta."
                </p>
                <div className="w-24 h-1 bg-vintage-red mx-auto mb-8"></div>

            </div>
        </footer>

      </main>
    </div>
  );
};

const StarIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#8b0000" stroke="#c5a059" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default App;