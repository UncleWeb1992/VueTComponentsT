import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'url' }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/components/icons/*',
          dest: 'icons',
        },
      ],
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/components/**/*'],
      exclude: ['**/__tests__/**'],
      cleanVueFileName: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: './src/components/index.ts',
      name: 'TComponents',
      formats: ['umd', 'es'],
      fileName: (format) => `t-components.${format}.js`,
    },
    assetsDir: 'src/components/icons',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.svg'],
})
