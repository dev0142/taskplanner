FROM node:19.6.0-alpine
WORKDIR app
COPY . .
RUN yarn install
# RUN npm run test
EXPOSE 3000
CMD ["yarn","run","dev"]
