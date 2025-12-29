/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    sm: "640px",
                    md: "100%",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1536px",
                    "3xl": "1800px",
                }
            },
            screens: {
                'xl': '1280px',
                '2xl': '1536px',
                '3xl': '1800px',
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                manrope: ['Manrope', 'sans-serif'],
            },
            colors: {
                background: 'var(--background)',
                surface: 'var(--surface)',
                border: 'var(--border)',
                textPrimary: 'var(--text-primary)',
                textSecondary: 'var(--text-secondary)',
                textOnWhite: '#4f4f4f',
                inverse: 'var(--inverse)',
                inverseSurface: 'var(--inverse-surface)',
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.4\"/%3E%3C/svg%3E')",
            },
            animation: {
                'blob': 'blob 20s infinite',
                'plasma': 'plasma 15s ease-in-out infinite alternate',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                'fade-in-right': 'fadeInRight 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                'fade-in-left': 'fadeInLeft 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                'blur-in': 'blurIn 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                'scale-in': 'scaleIn 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                'liquid-shape': 'liquidShape 10s ease-in-out infinite alternate',
                'liquid-rotate': 'liquidRotate 20s linear infinite',
                'float-horizontal': 'floatHorizontal 10s ease-in-out infinite alternate',
                'shimmer-down': 'shimmerDown 2s infinite',
                'marquee-left': 'marqueeLeft 60s linear infinite',
                'marquee-right': 'marqueeRight 60s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                plasma: {
                    '0%': { transform: 'translateX(-20%) scale(1)', opacity: '0.4' },
                    '100%': { transform: 'translateX(20%) scale(1.2)', opacity: '0.7' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                blurIn: {
                    '0%': { opacity: '0', filter: 'blur(10px)', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                liquidShape: {
                    '0%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
                    '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                },
                liquidRotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                floatHorizontal: {
                    '0%': { transform: 'translateX(-35%)' },
                    '100%': { transform: 'translateX(35%)' },
                },
                shimmerDown: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(200%)' },
                },
                marqueeLeft: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                marqueeRight: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                }
            }
        }
    },
    plugins: [],
}
