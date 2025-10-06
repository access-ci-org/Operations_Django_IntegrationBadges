import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                dir: '../static/integration-badges-ui-react',
                // Disable code splitting and create a single entry file
                manualChunks: false,
                inlineDynamicImports: true,
                entryFileNames: `[name].js`, // Customize the output filename
                assetFileNames: `[name].[ext]`, // Customize asset filenames (e.g., CSS)
            },
        },
    },
})
