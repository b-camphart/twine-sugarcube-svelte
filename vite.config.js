import { defineConfig } from "vite"
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { embedLibrary } from "./buildSrc/embed";
import { resolve } from 'path'
import { serve } from "./buildSrc/dev/server";
import { asyncTypeCheck } from "./buildSrc/typeCheck";

const name = "Name of the Game"

export default defineConfig(({ mode }) => {

  let server;
    
  process.on("SIGTERM", () => {
    server?.kill()
  })

  return {
    plugins: [
      svelte(),
      asyncTypeCheck(),
      embedLibrary({
        html: "src/index.html",
        outputLibName: "name-of-the-game.cjs",
        name
      }),
      mode === "development" ? serve() : {},
    ],
    build: {
      lib: {
        entry: "src/main.js",
        formats: ["cjs"],
        name
      },
      target: "es2018",
      minify: mode === "production",
      assetsInlineLimit: 0,
      sourcemap: mode === "production" ? false : "inline",
      watch: {
        include: ["index.html", "./public/**"]
      }
    },
    resolve: {
      alias: {
        "src": resolve("./src"),
        "framework": resolve("./framework")
      }
    }
  }
});