FROM node:6.9.4

RUN npm install pm2 -g

RUN npm install --only=production

CMD ["pm2-docker", "/opt/feature-toggle-service/app.js"]