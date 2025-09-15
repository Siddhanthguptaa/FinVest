// backend/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  setupFilesAfterEnv: ['./jest.setup.js'], // <-- Add this line
};