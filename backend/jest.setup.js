// backend/jest.setup.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This runs once before all tests
beforeAll(async () => {
  // A single, global cleanup of all tables
  await prisma.transactionLog.deleteMany({});
  await prisma.investment.deleteMany({});
  await prisma.investmentProduct.deleteMany({});
  await prisma.user.deleteMany({});
});

// This runs once after all tests are finished
afterAll(async () => {
  await prisma.$disconnect();
});