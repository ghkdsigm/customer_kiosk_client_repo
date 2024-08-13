import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mpark_Kios',
        short_name: 'PWA',
        description: 'My Vue3 Progressive Web App',
        theme_color: '#ffffff',
        background_color: "#ffffff",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        // screenshots: [
        //   {
        //     "src": "screenshots/screenshot1.png",
        //     "sizes": "1280x720",
        //     "type": "image/png",
        //     "form_factor": "wide"
        //   },
        //   {
        //     "src": "screenshots/screenshot2.png",
        //     "sizes": "720x1280",
        //     "type": "image/png",
        //     "form_factor": "narrow"
        //   }
        // ]
      }
    })
  ],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000
  },
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('custom-') // 맞춤형 요소 설정
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       }
  //     }
  //   }
  // }
})
