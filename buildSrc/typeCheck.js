import { exec } from "node:child_process";

/**
 * 
 * @returns {import("vite").Plugin}
 */
export function asyncTypeCheck() {
    /** @type {import("node:child_process").ChildProcess | undefined} */
    let checkProcess;
    
    process.on("SIGTERM", () => {
        checkProcess?.kill()
    })

    return {
        name: "type-check",
        buildStart() {
            if (checkProcess != null && checkProcess.exitCode == null) {
                checkProcess.kill();
            }

            checkProcess = exec("npm run check")
            checkProcess.stdout.pipe(process.stdout);
            checkProcess.stderr.pipe(process.stderr);
        }
    }
}