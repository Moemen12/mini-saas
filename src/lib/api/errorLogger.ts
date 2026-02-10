import { NextRequest } from "next/server";
import { promises as fs } from 'node:fs';
import path from 'node:path';

interface ErrorLog {
    timestamp: string;
    error: {
        name: string;
        message: string;
        stack?: string;
    };
    request: {
        url: string;
        method: string;
        headers: Record<string, string>;
    };
}

function formatError(error: unknown): ErrorLog['error'] {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }
    return {
        name: 'UnknownError',
        message: typeof error === 'string' ? error : String(error),
    };
}

export async function logCriticalError(error: unknown, request: NextRequest) {
    const errorLog: ErrorLog = {
        timestamp: new Date().toISOString(),
        error: formatError(error),
        request: {
            url: request.url,
            method: request.method,
            headers: Object.fromEntries(request.headers.entries()),
        },
    };

    if (process.env.NODE_ENV === 'development') {
        console.error('🔴 CRITICAL ERROR:', JSON.stringify(errorLog, null, 2));
    }

    const logsDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logsDir, `errors-${new Date().toISOString().split('T')[0]}.jsonl`);

    try {
        await fs.mkdir(logsDir, { recursive: true });
        const logEntry = JSON.stringify(errorLog) + '\n';
        await fs.appendFile(logFile, logEntry, 'utf-8');
    } catch (err) {
        console.error('Failed to write error log to disk:', err);
    }
}