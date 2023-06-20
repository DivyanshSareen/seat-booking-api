FROM node:18

# Create app directory
WORKDIR /divyansh/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/


RUN yarn install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN yarn run build

EXPOSE 8080
CMD yarn prisma migrate dev && node dist/main