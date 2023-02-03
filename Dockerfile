FROM node:12.2.0-alpine
WORKDIR app
COPY . .
RUN npm install --global yarn
RUN yarn install
# RUN npm run test
EXPOSE 8001
CMD ["yarn","run","dev"]
