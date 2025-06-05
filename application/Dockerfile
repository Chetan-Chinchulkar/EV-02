FROM node:16-slim

WORKDIR /app

COPY src/package.json .
RUN npm install

COPY src/ .

EXPOSE 3000

ENV FLAG=ev{5f7fba0db5ba58f5831c21a5bfaad84d}

CMD ["node", "index.js"] 
