FROM node:16.13.2
WORKDIR /app
COPY package.json ./
RUN npm install npm@8.6.0
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
