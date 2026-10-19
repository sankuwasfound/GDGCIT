import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['gdg-cit-tech-n4kp.onrender.com'],
  },
  preview: {
    allowedHosts: ['gdg-cit-tech-n4kp.onrender.com'],
  },
})
