FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps --include=optional

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY src/widget.style.css ./dist/widget.style.css
COPY src/admin.css ./dist/admin.css
COPY --from=builder /app/demo.html ./
COPY --from=builder /app/admin.html ./

EXPOSE 5000

CMD ["serve", ".", "-l", "5000"]