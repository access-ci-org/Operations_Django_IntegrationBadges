import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import image from '@rollup/plugin-image';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), image()],
    build: {
        assetsInlineLimit: 100000000,
        rollupOptions: {
            output: {
                dir: './build',
                // Disable code splitting and create a single entry file

                manualChunks: false,
                inlineDynamicImports: true,
                entryFileNames: `[name].js`, // Customize the output filename
                assetFileNames: `[name].[ext]`, // Customize asset filenames (e.g., CSS)
            },
        },
    },
})
