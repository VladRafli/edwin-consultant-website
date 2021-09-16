# Node JS
FROM node
# Working Directory: /client
WORKDIR /client
# Copy Everything to image
COPY . .
# Run 'npm install' to install packages
RUN npm install
# Environment Variables
# ! Change secrets to actual thing on production
ENV PORT=5000 EMAIL_USERNAME=secret EMAIL_PASSWORD=secret EMAIL_DEST=secret
# Expose ports => Server Port: 5000
EXPOSE 5000
# Run Shell Command
CMD [ "npm", "start" ]