# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# Install ALL dependencies, including dev tools
RUN npm install

COPY . .

EXPOSE 8000

# Run the development server, which handles TypeScript automatically
CMD ["npm", "run", "dev"]