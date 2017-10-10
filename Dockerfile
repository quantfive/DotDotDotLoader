FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# install yarn and yarn install
RUN npm install -g -s --no-progress yarn && \
    yarn install --no-progress

# Expose the public http port
EXPOSE 3000

# Bundle app source
COPY /build/ /usr/src/app/build
COPY /server/ /usr/src/app/server

# build and Start server
CMD ["yarn", "serve"]
