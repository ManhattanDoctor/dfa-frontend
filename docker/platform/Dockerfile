FROM node:18
WORKDIR /application
COPY ../../build /application
RUN npm i --omit=dev

ENV SOURCE=platform/browser
CMD node server.js