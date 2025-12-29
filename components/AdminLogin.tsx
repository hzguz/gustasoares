
import React, { useState } from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (status: boolean) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <Reveal variant="fade-up">
            <div className="bg-surface/50 backdrop-blur-xl border border-black/[0.04] p-8 md:p-12 rounded-3xl shadow-2xl">
                <h2 className="font-syne font-bold text-3xl text-center mb-2">Acesso Restrito</h2>
                <p className="text-center text-textSecondary text-sm mb-8 font-manrope">Faça login para gerenciar o portfólio</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2 font-syne">Usuário</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-background border border-black/[0.1] rounded-lg px-4 py-3 focus:outline-none focus:border-inverse transition-colors font-manrope"
                            placeholder="Digite seu usuário"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2 font-syne">Senha</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-black/[0.1] rounded-lg px-4 py-3 focus:outline-none focus:border-inverse transition-colors font-manrope"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                    <div className="flex flex-col gap-3 mt-4">
                        <Button type="submit" variant="primary" className="w-full">Entrar</Button>
                        <button 
                            type="button" 
                            onClick={onBack}
                            className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-textSecondary hover:text-textPrimary mt-4 transition-colors font-syne"
                        >
                            <ArrowLeft size={14} /> Voltar ao Site
                        </button>
                    </div>
                </form>
            </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AdminLogin;
