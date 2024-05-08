FROM node:lts-bookworm-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8000"]
