import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vite-deploy-demo/'
  //preview: {
    //host: "0.0.0.0"
    
  //}
})