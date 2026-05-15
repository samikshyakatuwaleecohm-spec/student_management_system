export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 25px 60px rgba(79, 70, 229, 0.15)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 45%), radial-gradient(circle at 20% 15%, rgba(168, 85, 247, 0.12), transparent 25%), linear-gradient(180deg, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.92))',
      },
      colors: {
        primary: '#4f46e5',
        surface: '#0f172a',
      },
    },
  },
  plugins: [],
};
