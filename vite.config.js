import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteJsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteJsconfigPaths(), svgrPlugin(), legacy()],
	build: {
		outDir: "build",
	},
	server: {
		open: true,
		port: 3000,
	},
});
