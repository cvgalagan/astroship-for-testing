import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { partytownVite } from '@builder.io/partytown/utils';
import path from 'path';
import { partytownSnippet } from '@builder.io/partytown/integration';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // partytownVite({
    //   dest: path.join(__dirname, 'dist', '~partytown'),
    // }),
    // {
    //   name: 'insert-partytown',
    //   transformIndexHtml: {
    //     order: 'pre',
    //     handler(html) { return html.replace("/* partytownSnippet */", partytownSnippet()) }
    //   }
    // }
  ],
})
