/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            '@controllers': '/src/controllers',
            '@db': '/src/db',
            '@middlewares': '/src/middlewares',
            '@dto': '/src/models/dto',
            '@repositories': '/src/db/repositories',
            '@routes': '/src/routes',
            '@services': '/src/services',
            '@utils': '/src/utils',
            '@docs': '/src/docs',
        },
    },
    test: {
        globals: true,
        environment: 'node',
        setupFiles: './src/tests/setup.ts',
        include: ['src/tests/unit/**/*.spec.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            all: true,
            include: ['src/**/*.ts'],
            exclude: [
                'src/tests/**',
                'src/middlewares/**',
                'src/routes/**',
                'src/app.ts',
                'src/server.ts',
                'src/utils/**',
                'src/config/**',
                'src/dto/**',
                'src/types/**',
                'src/docs/**',
            ],
        },
    },
});
