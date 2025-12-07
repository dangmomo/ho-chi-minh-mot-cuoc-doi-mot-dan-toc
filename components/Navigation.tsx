import React, { useState, useEffect } from 'react';
import { HistoricalPeriod } from '../types';
import { Scroll, ChevronRight } from 'lucide-react';

interface Props {
    periods: HistoricalPeriod[];
    activeSection: string;
}

export const Navigation: React.FC<Props> = ({ periods, activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-vintage-red text-vintage-paper p-4 rounded-full shadow-xl md:hidden hover:bg-red-900 transition-colors border-2 border-vintage-gold"
            >
                <Scroll />
            </button>

            {/* Sidebar Container */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-vintage-paper border-r-4 border-double border-vintage-gold/30 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}>
                
                {/* Header */}
                <div className="p-6 border-b border-vintage-dark/10 bg-[#ebe3cd]">
                    <h2 className="font-serif text-2xl font-bold text-vintage-red text-center uppercase tracking-widest border-b-2 border-vintage-red/20 pb-2">
                        Mục Lục
                    </h2>
                    <p className="text-center text-xs font-body italic text-vintage-dark/60 mt-2">Hồ Chí Minh: Một Cuộc Đời</p>
                </div>

                {/* Timeline Links */}
                <div className="py-4 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-vintage-dark/10"></div>

                    {periods.map((period) => (
                        <div key={period.id} className="relative mb-1">
                            <button
                                onClick={() => scrollToSection(period.id)}
                                className={`w-full text-left pl-12 pr-4 py-3 group relative transition-all duration-300 hover:bg-vintage-gold/10 ${activeSection === period.id ? 'bg-vintage-gold/20' : ''}`}
                            >
                                {/* Dot Indicator */}
                                <div className={`absolute left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === period.id ? 'bg-vintage-red border-vintage-red scale-125' : 'bg-vintage-paper border-vintage-dark/30 group-hover:border-vintage-red'}`}></div>

                                <span className={`block font-serif text-lg ${activeSection === period.id ? 'text-vintage-red font-bold' : 'text-vintage-dark group-hover:text-vintage-red'}`}>
                                    {period.period.split('–')[0]}
                                </span>
                                <span className="block text-xs font-body text-vintage-dark/60 uppercase tracking-wide truncate">
                                    {period.title}
                                </span>

                                {activeSection === period.id && (
                                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-vintage-red animate-pulse" size={16} />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer Deco */}
                <div className="p-6 mt-auto text-center opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png" alt="Flag" className="w-12 mx-auto grayscale opacity-50 mb-2" />
                    <div className="font-script text-xl text-vintage-dark">1890 - 1969</div>
                </div>
            </div>
        </>
    );
};