import { defineConfig } from "vite";
import million from "million/compiler";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
**/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    million.vite({
				auto: true,
			}),
			react(),
			VitePWA({
				workbox: {
					cleanupOutdatedCaches: true,
					globPatterns: ["**/*"],
				},
				registerType: "autoUpdate",
				injectRegister: "auto",
				includeAssets: ["**/*"],
			}),
    mode === "development" && tailwindcss(),
  ].filter(Boolean),
}));
