FROM node:alpine

WORKDIR /usr/src/app

# copy the package.json file
COPY reactclientapp/package*.json ./

# install the dependencies
RUN npm install

# copy the rest of the files
COPY ./reactclientapp .

# expose the port
EXPOSE 3000

# start the react app
CMD ["npm", "start"]
