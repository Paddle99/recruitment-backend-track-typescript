# --- Development stage ---
FROM node:20-alpine AS development
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm install

COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma 

# --- Build stage ---
FROM development AS build

# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npm run build

# --- Production runtime ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["node", "dist/index.js"]
