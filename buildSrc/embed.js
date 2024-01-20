import { readFileSync, rmSync, writeFileSync, existsSync } from "fs";

/**
 * @param {Parameters<typeof embed>[0]} options 
 * @returns {import("vite").Plugin}
 */
export function embedLibrary(options) {
    /** @type {import("vite").Plugin} */
    return {
        name: "embed",
        closeBundle: function () {
            embed(options)
        }
    }
}

/**
 * 
 * @param {object} options
 * @param {string} options.html - the name of the html file to embed the library within
 * @param {string} [options.outDir]
 * @param {string} options.outputLibName
 * @param {string} [options.name] - the name of the library as seen by users
 * @param {boolean} [options.remove] - remove the library file after embed
 * @returns 
 */
export function embed({
    html,
    outDir = "dist",
    outputLibName,
    name = outputLibName,
    remove = false
}) {
    const libRelativePath = `${outDir}/${outputLibName}`
    if (! existsSync(libRelativePath)) {
        console.log("compiled js does not yet exist")
        return;
    }
    const gameScript = readFileSync(libRelativePath, "utf-8")
    const htmlTemplate = readFileSync(html, "utf-8")
    
    const htmlContent = htmlTemplate.replace("{{title}}", name)
        .replace("{{embed}}", gameScript)
    
    writeFileSync(`${outDir}/index.html`, htmlContent)
    if (remove) {
        rmSync(libRelativePath)
    }
}