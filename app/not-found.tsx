'use client';

import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at right, rgba(40, 40, 40, 0.4) 0%, transparent 70%)'
                }}
            />
            {/* 404 Title */}
            <Reveal variant="blur-in" delay={100}>
                <h1 className="font-syne font-bold text-[120px] md:text-[160px] lg:text-[200px] leading-none text-textPrimary/5 select-none mb-8 md:mb-12">
                    404
                </h1>
            </Reveal>

            {/* Message */}
            <Reveal variant="fade-up" delay={200}>
                <div className="text-center">
                    <h2 className="font-syne font-bold text-2xl md:text-3xl text-textPrimary mb-4">
                        Página não encontrada
                    </h2>
                    <p className="font-manrope text-sm md:text-base text-textSecondary max-w-md mb-8">
                        A página que você está procurando não existe ou foi movida.
                    </p>
                </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal variant="fade-up" delay={300}>
                <Link href="/">
                    <Button
                        variant="primary"
                        className="py-3 px-6 text-sm group bg-gradient-to-r from-[#353535] to-[#111111]"
                    >
                        Voltar para o início
                        <IconArrowRight
                            size={16}
                            stroke={1.5}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Button>
                </Link>
            </Reveal>
        </main>
    );
}
