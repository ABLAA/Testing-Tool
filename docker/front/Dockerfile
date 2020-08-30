FROM node:8.12.0 as build

# Set app directory
WORKDIR /usr/src/app

COPY . .

# Setting Proxy
RUN  export http_proxy=http://10.170.209.36:3128 
RUN  export http_proxy=http://10.170.209.36:3128 
RUN  npm config set registry http://registry.npmjs.org/
RUN  npm config set http-proxy http://10.170.209.36:3128 
RUN  npm config set https-proxy http://10.170.209.36:3128


# Install independencies
RUN npm install

# Build the app
RUN yarn build
################################################################
# Stage 2: Copying the building Stage output to the Nginx Image:
# The alpine tag means the lightest stable image.
FROM nginx:latest

# Copy the app source files, and specify the image “build” as the source:
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose Nginx port and launch its service:
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]