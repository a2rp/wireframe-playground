import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/wireframe-playground/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
