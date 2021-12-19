module.exports = {
    '*.{ts,tsx,js,jsx}': [
        'prettier --write',
        'eslint --fix',
        'npm run test -- --watchAll=false --findRelatedTests',
    ],
};
