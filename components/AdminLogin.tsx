
import React, { useState } from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { IconArrowLeft } from '@tabler/icons-react';
import { supabase } from '../lib/supabase';
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Removed
// import { auth } from '../lib/firebase'; // Removed

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;

      onLogin(true);
    } catch (err: any) {
      console.error('Login error:', err);
      // Map Supabase error messages usually, but they are decent by default
      if (err.message.includes('Invalid login credentials')) {
        setError('Credenciais inválidas (E-mail ou senha incorretos)');
      } else {
        setError(`Erro: ${err.message}`);
      }
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
      const { error } = await supabase.auth.resetPasswordForEmail(username, {
        redirectTo: window.location.origin + '/admin', // Redirect back to admin login
      });

      if (error) throw error;

      setResetMessage('Link de redefinição enviado! Verifique seu e-mail.');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-black/[0.03] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-black/[0.02] to-transparent rounded-full blur-3xl" />


      <div className="relative z-10 w-full max-w-md px-6">
        <Reveal variant="fade-up">
          <div className="bg-white/80 backdrop-blur-2xl border border-black/[0.06] p-10 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
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
                    className="w-full bg-white/50 border border-black/[0.08] rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all font-manrope"
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
                    className="w-full bg-white/50 border border-black/[0.08] rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all font-manrope"
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2 font-syne">Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/50 border border-black/[0.08] rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all font-manrope"
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
                    <IconArrowLeft size={14} stroke={1.5} /> Voltar ao Site
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
