import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
    // NOTE: Glob of files to load (can be an array and include absolute paths)
    files: './dist/test/**/*.test.js',
});
