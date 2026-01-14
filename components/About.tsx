import React from 'react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface AboutProps {
    translations: Translations;
}

const About: React.FC<AboutProps> = ({ translations }) => {
    const { aboutPage } = translations;

    return (
        <section id="about" className="py-20 md:py-28 xl:py-40 relative overflow-hidden border-t border-b border-black/[0.04]">
            <GridLines variant="outer" />
            <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-12 xl:gap-32 items-center">

                    {/* Text Side (Left) */}
                    <div className="order-2 xl:order-1">
                        <Reveal variant="fade-up">
                            <h2 className="font-syne font-bold text-4xl md:text-4xl lg:text-5xl mb-8 leading-tight">
                                {aboutPage.introduction.titlePrefix} <br /> <span className="bg-gradient-to-r from-[#111111] to-[#ababab] bg-clip-text text-transparent">{aboutPage.introduction.titleHighlight}</span>
                            </h2>
                            <div className="font-manrope text-lg leading-relaxed whitespace-pre-line mb-10 bg-gradient-to-br from-[#111111] to-[#ababab] bg-clip-text text-transparent">
                                {aboutPage.history.description}
                            </div>

                            {/* Highlights */}
                            <div className="relative grid grid-cols-3 gap-3 md:gap-6 p-3 md:p-4 border border-black/[0.08] rounded-[24px] md:rounded-[32px]">
                                {aboutPage.history.highlights.map((highlight, idx) => {
                                    const isFirst = idx === 0;
                                    return (
                                        <div
                                            key={idx}
                                            className={`relative z-10 flex flex-col gap-3 md:gap-5 p-6 md:p-12 rounded-2xl md:rounded-3xl ${isFirst ? 'bg-black' : 'border-black/[0.04]'}`}
                                        >
                                            <span className={`font-syne font-bold text-xl md:text-3xl xl:text-5xl ${isFirst ? 'text-white' : 'text-textPrimary'}`}>
                                                {highlight.number}
                                            </span>
                                            <span className={`font-manrope text-xs md:text-xs uppercase tracking-wider ${isFirst ? 'text-white/80' : 'bg-gradient-to-r from-[#111111] to-[#ababab] bg-clip-text text-transparent'}`}>
                                                {highlight.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>

                    {/* Image Side (Right) */}
                    <div className="order-1 xl:order-2 relative">
                        <Reveal variant="fade-left" delay={200}>
                            <div className="relative aspect-square group">
                                {/* Main Image Container */}
                                <div className="relative z-10 rounded-[2rem] overflow-hidden border border-black/[0.04] h-full shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                                    <img
                                        src={aboutPage.history.image}
                                        alt="Gusta Soares"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.1]"
                                    />

                                    {/* Decorative elements */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
                                </div>

                                {/* Tech Corners - Cor preta, 1px, aparece no hover */}
                                <div className="hidden md:block absolute -top-4 -left-4 w-4 h-4 border-t border-l border-black z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:-translate-y-2 rounded-tl-xl" />
                                <div className="hidden md:block absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-black z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-2 rounded-br-xl" />
                                <div className="hidden md:block absolute -bottom-4 -left-4 w-4 h-4 border-b border-l border-black z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:translate-y-2 rounded-bl-xl" />
                                <div className="hidden md:block absolute -top-4 -right-4 w-4 h-4 border-t border-r border-black z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 rounded-tr-xl" />
                            </div>
                        </Reveal>
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-inverse/5 blur-[100px] -z-10 rounded-full" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
