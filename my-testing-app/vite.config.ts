import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from LAN
    port: 5173,  // Change the port if needed
  },
});
