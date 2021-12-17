module.exports = {
    '*.{ts,tsx,js,jsx}': [
        () => 'tsc --noEmit',
        'npm run prettier',
        'npm run linter',
        () => 'npm run test',
    ],
};
