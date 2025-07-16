import { defineConfig } from "vite";

export default defineConfig({
	root: "./src",
	build: {
		outDir: "../dist",
		minify: "terser", // Enable Terser minification
		terserOptions: {
			compress: {
				drop_console: true, // Removes console logs in production
				drop_debugger: true, // Removes debugger statements in production
			},
			mangle: true, // Minifies variable and function names
		},
		emptyOutDir: true,
	},
});
