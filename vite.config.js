import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/p7/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
});
