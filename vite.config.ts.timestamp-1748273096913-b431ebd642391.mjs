// vite.config.ts
import { defineConfig } from "file:///D:/Dev/components/Table/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Dev/components/Table/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import svgLoader from "file:///D:/Dev/components/Table/node_modules/vite-svg-loader/index.js";
import dts from "file:///D:/Dev/components/Table/node_modules/vite-plugin-dts/dist/index.mjs";
import { viteStaticCopy } from "file:///D:/Dev/components/Table/node_modules/vite-plugin-static-copy/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: "url" }),
    viteStaticCopy({
      targets: [
        {
          src: "src/components/icons/*",
          dest: "icons"
        }
      ]
    }),
    dts({
      insertTypesEntry: true,
      include: ["src/components/**/*"],
      exclude: ["**/__tests__/**"],
      cleanVueFileName: true,
      copyDtsFiles: true,
      tsconfigPath: "./tsconfig.json"
    })
  ],
  build: {
    lib: {
      entry: "./src/components/index.ts",
      name: "TComponents",
      formats: ["umd", "es"],
      fileName: (format) => `t-components.${format}.js`
    },
    assetsDir: "src/components/icons",
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    },
    emptyOutDir: true
  },
  assetsInclude: ["**/*.svg"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZcXFxcY29tcG9uZW50c1xcXFxUYWJsZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRGV2XFxcXGNvbXBvbmVudHNcXFxcVGFibGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0Rldi9jb21wb25lbnRzL1RhYmxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBzdmdMb2FkZXIoeyBkZWZhdWx0SW1wb3J0OiAndXJsJyB9KSxcbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6ICdzcmMvY29tcG9uZW50cy9pY29ucy8qJyxcbiAgICAgICAgICBkZXN0OiAnaWNvbnMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjL2NvbXBvbmVudHMvKiovKiddLFxuICAgICAgZXhjbHVkZTogWycqKi9fX3Rlc3RzX18vKionXSxcbiAgICAgIGNsZWFuVnVlRmlsZU5hbWU6IHRydWUsXG4gICAgICBjb3B5RHRzRmlsZXM6IHRydWUsXG4gICAgICB0c2NvbmZpZ1BhdGg6ICcuL3RzY29uZmlnLmpzb24nLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICcuL3NyYy9jb21wb25lbnRzL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdUQ29tcG9uZW50cycsXG4gICAgICBmb3JtYXRzOiBbJ3VtZCcsICdlcyddLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGB0LWNvbXBvbmVudHMuJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIGFzc2V0c0RpcjogJ3NyYy9jb21wb25lbnRzL2ljb25zJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLnN2ZyddLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxvQkFBb0I7QUFDNVIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxzQkFBc0I7QUFFL0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUEsSUFDbEMsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsTUFDbEIsU0FBUyxDQUFDLHFCQUFxQjtBQUFBLE1BQy9CLFNBQVMsQ0FBQyxpQkFBaUI7QUFBQSxNQUMzQixrQkFBa0I7QUFBQSxNQUNsQixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxnQkFBZ0IsTUFBTTtBQUFBLElBQzlDO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxlQUFlLENBQUMsVUFBVTtBQUM1QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
