import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteJsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import legacy from "@vitejs/plugin-legacy";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteJsconfigPaths(),
		svgrPlugin(),
		eslint(),
		EnvironmentPlugin(
			"all",
			{
				prefix: "REACT_APP_",
			},
			{
				NODE_ENV: "development",
			}
		),
		legacy(),
	],
	build: {
		outDir: "build",
		minify: false,
	},
	server: {
		open: true,
		port: 3000,
	},
});
