# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .

COPY yarn.lock .

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

EXPOSE 3001

# Creates a "dist" folder with the production build

RUN npx prisma generate ; yarn build

RUN chmod +x /api/setup.sh

COPY . .

# Start the server using the production build
CMD [ "node", "dist/main.js" ]