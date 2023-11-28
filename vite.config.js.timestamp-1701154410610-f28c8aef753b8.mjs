// vite.config.js
import { defineConfig } from "file:///C:/Users/gerwy/Desktop/virtual-gallery-react-2/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/gerwy/Desktop/virtual-gallery-react-2/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react({
    // Add this line
    include: "**/*.jsx"
  })],
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@views": "/src/views",
      "@assets": "/src/assets",
      "@scss": "/src/scss",
      "@layout": "/src/layout"
      // Add more aliases as needed
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZXJ3eVxcXFxEZXNrdG9wXFxcXHZpcnR1YWwtZ2FsbGVyeS1yZWFjdC0yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnZXJ3eVxcXFxEZXNrdG9wXFxcXHZpcnR1YWwtZ2FsbGVyeS1yZWFjdC0yXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9nZXJ3eS9EZXNrdG9wL3ZpcnR1YWwtZ2FsbGVyeS1yZWFjdC0yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3Qoe1xuICAgIC8vIEFkZCB0aGlzIGxpbmVcbiAgICBpbmNsdWRlOiBcIioqLyouanN4XCIsXG4gIH0pXSxcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWVcbiAgICB9LFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gICAgfVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAc3JjJzogJy9zcmMnLFxuICAgICAgJ0Bjb21wb25lbnRzJzogJy9zcmMvY29tcG9uZW50cycsXG4gICAgICAnQHZpZXdzJzogJy9zcmMvdmlld3MnLFxuICAgICAgJ0Bhc3NldHMnOiAnL3NyYy9hc3NldHMnLFxuICAgICAgJ0BzY3NzJzogJy9zcmMvc2NzcycsXG4gICAgICAnQGxheW91dCc6ICcvc3JjL2xheW91dCcsXG4gICAgICAvLyBBZGQgbW9yZSBhbGlhc2VzIGFzIG5lZWRlZFxuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXNVLFNBQVMsb0JBQW9CO0FBQ25XLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTTtBQUFBO0FBQUEsSUFFZCxTQUFTO0FBQUEsRUFDWCxDQUFDLENBQUM7QUFBQSxFQUNGLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxNQUNmLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQTtBQUFBLElBRWI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
