FROM node:20.11-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=1024"

EXPOSE 5173
COPY dist/ /app/dist/
CMD ["npm", "run", "start"]
