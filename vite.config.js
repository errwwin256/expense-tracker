import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/expense-tracker/", // 👈 use your repo name here
  plugins: [react()],
});
