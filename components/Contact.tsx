
import React, { useState } from 'react';
import { Mail, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { Translations } from '../types';
import Button from './Button';
import Reveal from './Reveal';
import GridLines from './GridLines';
import CustomSelect from './CustomSelect';

import { supabase } from '../lib/supabase';

interface ContactProps {
    text: Translations['contact'];
    socialEmail: string;
}

const Contact: React.FC<ContactProps> = ({ text, socialEmail }) => {
    const [area, setArea] = useState('');
    const [investment, setInvestment] = useState('');

    // Form States
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor, preencha os campos obrigatórios.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('contacts')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    area: area,
                    budget: investment,
                    message: formData.message
                });

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });
            setArea('');
            setInvestment('');
            // Success handled by conditional rendering now

        } catch (error: any) {
            console.error('Error sending message:', error);
            setStatus('error');
            alert('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="contact" className="py-24 md:py-40 relative overflow-hidden bg-surface/30 border-t border-black/[0.04]">
            <GridLines variant="outer" />

            {/* Background Light - Significantly Reduced Intensity */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-inverse/[0.02] to-transparent pointer-events-none" />

            <div className="w-full max-w-[1600px] mx-auto px-5 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left Column: Text */}
                    <div className="flex flex-col justify-center">
                        <Reveal variant="scale-in">
                            {/* Tagline */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.06] backdrop-blur-md mb-6 md:mb-8 w-fit hover:bg-black/[0.1] hover:scale-105 transition-all duration-300">
                                <MessageSquare size={12} className="text-textPrimary" strokeWidth={1} />
                                <span className="text-[10px] font-syne font-bold tracking-[0.2em] text-textSecondary uppercase leading-none pt-[1px]">
                                    {text.tagline}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal variant="blur-in" delay={100} duration={0.8}>
                            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-textPrimary mb-6 md:mb-8 leading-[0.95]">
                                {text.title}
                            </h2>
                        </Reveal>

                        <Reveal variant="fade-right" delay={200} duration={0.8}>
                            <p className="font-manrope text-textSecondary text-base md:text-lg mb-12 md:mb-48 max-w-lg leading-relaxed">
                                {text.description}
                            </p>
                        </Reveal>

                        <Reveal variant="fade-up" delay={300}>
                            <div className="mt-auto">
                                <p className="font-manrope text-textSecondary text-xs uppercase tracking-widest mb-4">{text.orEmail}</p>
                                <a
                                    href={`mailto:${socialEmail}`}
                                    className="font-syne font-medium text-lg text-textPrimary hover:text-textSecondary transition-colors flex items-center gap-3 group w-fit"
                                >
                                    <div className="w-8 h-8 bg-inverse/10 text-textPrimary rounded-full flex items-center justify-center group-hover:bg-inverse group-hover:text-inverseSurface transition-all">
                                        <Mail size={14} strokeWidth={1} />
                                    </div>
                                    {socialEmail}
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Form with Container - Rounded 32px - Subtle Border */}
                    <Reveal variant="fade-left" delay={200} duration={0.8} width="100%">
                        <div className="relative">
                            {/* Cyberpunk Form Container - Updated: Radius 32px, Border opacity 0.04 */}
                            <div className="bg-background p-6 md:p-10 rounded-[24px] md:rounded-[32px] relative border border-black/[0.04] overflow-hidden min-h-[600px] flex flex-col justify-center">
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-black/[0.04] rounded-tr-[24px] md:rounded-tr-[32px] z-10" />

                                {status === 'success' ? (
                                    <div className="flex flex-col items-center justify-center text-center w-full h-full animate-fade-in py-10">
                                        {/* Success Icon */}
                                        <div className="relative mb-8 group">
                                            <div className="absolute inset-0 bg-black/5 rounded-full blur-xl animate-pulse" />
                                            <div className="relative w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg">
                                                <Check size={40} className="text-white animate-in zoom-in duration-500 delay-100" strokeWidth={3} />
                                            </div>

                                            {/* Decorative particles */}
                                            <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-400 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                                            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-zinc-300 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.2s' }} />
                                        </div>

                                        <h3 className="font-syne font-bold text-xl text-textPrimary mb-4">
                                            Mensagem Enviada!
                                        </h3>
                                        <p className="font-manrope text-textSecondary text-base max-w-sm mb-10 leading-relaxed">
                                            Recebi seu contato com sucesso. Em breve retornarei com uma resposta.
                                        </p>

                                        <Button
                                            variant="primary"
                                            onClick={() => setStatus('idle')}
                                            className="w-full md:w-auto py-4 px-10 text-base"
                                        >
                                            Enviar outra mensagem
                                        </Button>
                                    </div>
                                ) : (
                                    <form className="flex flex-col gap-8 md:gap-10" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="group relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-transparent border-b border-black/[0.12] py-3 text-textPrimary text-base font-manrope focus:outline-none focus:border-inverse transition-colors placeholder:text-textSecondary/70 hover:border-black/[0.3]"
                                                    placeholder={text.form.name}
                                                />
                                            </div>
                                            <div className="group relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-transparent border-b border-black/[0.12] py-3 text-textPrimary text-base font-manrope focus:outline-none focus:border-inverse transition-colors placeholder:text-textSecondary/70 hover:border-black/[0.3]"
                                                    placeholder={text.form.email}
                                                />
                                            </div>
                                        </div>

                                        <div className="group relative">
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-black/[0.12] py-3 text-textPrimary text-base font-manrope focus:outline-none focus:border-inverse transition-colors placeholder:text-textSecondary/70 hover:border-black/[0.3]"
                                                placeholder={text.form.company}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                                            <div className="group relative">
                                                <CustomSelect
                                                    options={text.form.areas}
                                                    value={area}
                                                    onChange={setArea}
                                                    placeholder={text.form.area}
                                                />
                                            </div>

                                            <div className="group relative">
                                                <CustomSelect
                                                    options={text.form.budgets}
                                                    value={investment}
                                                    onChange={setInvestment}
                                                    placeholder={text.form.investment}
                                                />
                                            </div>
                                        </div>

                                        <div className="group relative z-10">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full bg-transparent border-b border-black/[0.12] py-3 text-textPrimary text-base font-manrope focus:outline-none focus:border-inverse transition-colors resize-none placeholder:text-textSecondary/70 hover:border-black/[0.3]"
                                                placeholder={text.form.message}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full md:w-auto py-4 px-8 text-sm group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            >
                                                {loading ? 'Enviando...' : text.form.submit}
                                                {!loading && (
                                                    <ArrowRight size={16} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
