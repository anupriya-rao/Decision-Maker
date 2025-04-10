import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 Replace with your GitHub repo name
const repoName = 'Decision-Maker';

export default defineConfig({
  base: `/${repoName}/`, // 🔥 THIS is what makes GitHub Pages work
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});