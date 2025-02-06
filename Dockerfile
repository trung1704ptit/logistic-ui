FROM node:20.11-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript
COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]
