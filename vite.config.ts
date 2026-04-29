import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {},
  },

  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/main.tsx',
      name: 'ClaimWidget',
      formats: ['iife'],
      fileName: () => 'claim-widget.iife.js',
    },
  },
});