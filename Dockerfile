FROM node:latest
RUN npm install -g serve create-react-app
EXPOSE 3000
WORKDIR /webapp
ADD package.json .
RUN yarn install
ADD . .
RUN if [ -d "build/" ]; then rm -rf build; fi
RUN yarn run build
CMD serve -s -c 0 build
