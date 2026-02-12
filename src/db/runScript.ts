export async function runScript(
    name: string,
    fn: () => Promise<void>
) {
    try {
        console.log(`🚀 Running ${name}...`);
        await fn();
        console.log(`🏁 ${name} finished successfully.`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ ${name} failed:`, error);
        process.exit(1);
    }
}