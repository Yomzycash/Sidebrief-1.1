import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteJsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteJsconfigPaths(), svgrPlugin(), eslint(), legacy()],
	build: {
		outDir: "build",
	},
	server: {
		open: true,
		port: 3000,
	},
});
