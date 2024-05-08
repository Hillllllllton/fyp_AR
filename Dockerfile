FROM node:21.1.0-alpine3.18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8000"]
