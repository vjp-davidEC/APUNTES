    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Times New Roman"', 'Times', 'serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
          },
          colors: {
            ideBg: '#070d19',
            ideCard: '#0f172a',
            idePanel2: '#1e293b',
            ideBorder: '#1e3a5f',
            ideText: '#f0f6ff',
            ideMuted: '#94a3b8',
            lightBg: '#f0f6ff',
            lightCard: '#ffffff',
            lightPanel2: '#e2eeff',
            lightBorder: '#c7dbf7',
            lightText: '#0f172a',
            lightMuted: '#475569',
            android: '#3DDC84',
            kotlin: '#3b82f6',
            ktMagenta: '#2563eb',
            ktOrange: '#06b6d4',
          },
          keyframes: {
            floatSlow: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-5px)' },
            },
          },
          animation: {
            floatSlow: 'floatSlow 3.5s ease-in-out infinite',
          },
        },
      },
    };
  
