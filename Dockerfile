FROM node:lts
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci

# Copy and build app
ENV NODE_ENV=production
COPY . .
RUN npm run clean
RUN npm run build

CMD ["npm", "run", "start"]