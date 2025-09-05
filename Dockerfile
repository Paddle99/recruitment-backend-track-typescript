# --- development stage ---
FROM node:20-alpine AS development
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm ci || npm install

COPY tsconfig.json ./

COPY src ./src

# --- build stage ---
FROM development AS build
RUN npm run build

# --- production runtime ---
FROM node:20-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"] 