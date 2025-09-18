// backend/src/index.ts
import { app } from './app';
const PORT = process.env.PORT || 8000;

// This condition prevents the server from starting during tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}