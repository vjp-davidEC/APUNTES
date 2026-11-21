    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
          },
          colors: {
            ideBg: '#0c0c14',
            ideCard: '#151523',
            idePanel2: '#1d1d30',
            ideBorder: '#292840',
            ideText: '#f0effa',
            ideMuted: '#a5a3c2',
            lightBg: '#f5f6fb',
            lightCard: '#ffffff',
            lightPanel2: '#eef0f8',
            lightBorder: '#dce0ef',
            lightText: '#171625',
            lightMuted: '#55536e',
            android: '#3DDC84',
            kotlin: '#7F52FF',
            ktMagenta: '#C711E1',
            ktOrange: '#F88909',
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
  
