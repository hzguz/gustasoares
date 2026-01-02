
import React, { useState } from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { ArrowLeft } from 'lucide-react';

import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AdminLoginProps {
  onLogin: (status: boolean) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, username, password);
      onLogin(true);
    } catch (err) {
      setError('Credenciais inválidas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');

    if (!username) {
      setError('Por favor, digite seu e-mail para redefinir a senha.');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, username);
      setResetMessage('Link de redefinição enviado! Verifique seu e-mail.');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('E-mail não encontrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('E-mail inválido.');
      } else {
        setError('Erro ao enviar e-mail. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6">
        <Reveal variant="fade-up">
          <div className="bg-surface/50 backdrop-blur-xl border border-black/[0.04] p-8 md:p-12 rounded-3xl shadow-2xl">
            <h2 className="font-syne font-bold text-3xl text-center mb-2">
              {isResetting ? 'Redefinir Senha' : 'Acesso Restrito'}
            </h2>
            <p className="text-center text-textSecondary text-sm mb-8 font-manrope">
              {isResetting
                ? 'Digite seu e-mail para receber um link de redefinição'
                : 'Faça login para gerenciar o portfólio'}
            </p>

            {isResetting ? (
              <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2 font-syne">E-mail</label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-black/[0.1] rounded-lg px-4 py-3 focus:outline-none focus:border-inverse transition-colors font-manrope"
                    placeholder="Digite seu e-mail cadastrado"
                  />
                </div>

                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                {resetMessage && <p className="text-green-500 text-sm font-medium text-center">{resetMessage}</p>}

                <div className="flex flex-col gap-3 mt-4">
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Link'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => { setIsResetting(false); setError(''); setResetMessage(''); }}
                    className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-textSecondary hover:text-textPrimary mt-2 transition-colors font-syne"
                  >
                    Voltar ao Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2 font-syne">E-mail</label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-black/[0.1] rounded-lg px-4 py-3 focus:outline-none focus:border-inverse transition-colors font-manrope"
                    placeholder="Digite seu e-mail"
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
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => { setIsResetting(true); setError(''); }}
                      className="text-xs text-textSecondary hover:text-textPrimary transition-colors font-manrope underline"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                <div className="flex flex-col gap-3 mt-4">
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-textSecondary hover:text-textPrimary mt-4 transition-colors font-syne"
                  >
                    <ArrowLeft size={14} /> Voltar ao Site
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AdminLogin;
