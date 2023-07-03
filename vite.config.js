import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  //   plugins: [vue()],
  server: {
    port: 3000,
  },
  optimizeDeps: { include: ['lodash.throttle', 'lodash.orderby'] },
});
