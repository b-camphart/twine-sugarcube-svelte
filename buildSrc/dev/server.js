import { ChildProcess, exec} from 'child_process'

/**
 * 
 * @param {Parameters<typeof startServer>[0]} outDir 
 * @returns {import("vite").Plugin}
 */
export function serve(outDir) {
    /** @type {ChildProcess | undefined} */
    let server;

    process.on("SIGTERM", () => {
        server?.kill();
    })

    /** @type {import("vite").Plugin} */
    return {
        name: "development-server",
        closeBundle() {
            if (server == null) {
                server = startServer(outDir)
            }
        }
    }
}

/**
 * 
 * @param {string} outDir - the relative directory path to point the server to
 * @returns {ChildProcess}
 */
export function startServer(outDir = "dist") {
	const server = exec(
		`npx http-server "${process.cwd()}/${outDir}" -p 5173 -c-1 -o`,
	);

	server.stdout.pipe(process.stdout);
	server.stderr.pipe(process.stderr);

    return server
}
