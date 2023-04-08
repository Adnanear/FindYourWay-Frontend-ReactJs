import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dotEnv } from './src/Utils/Dotenv';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(dotEnv.get('VITE_APP_PORT', '443')),
    },
    plugins: [react(), tsconfigPaths()],
  };
});
