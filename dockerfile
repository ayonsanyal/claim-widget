
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/demo.html ./
COPY --from=builder /app/claims.css ./

EXPOSE 5000

CMD ["serve", ".", "-l", "5000"]