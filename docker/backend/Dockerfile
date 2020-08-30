#ADMIN Server
FROM node:8.12.0
WORKDIR /home/node/app

COPY server/ /home/node/app/


# Setting Proxy
RUN  export http_proxy=http://10.170.209.36:3128 
RUN  export http_proxy=http://10.170.209.36:3128 
RUN  npm config set registry http://registry.npmjs.org/
RUN  npm config set http-proxy http://10.170.209.36:3128 
RUN  npm config set https-proxy http://10.170.209.36:3128


#Installing Packages
RUN npm install


# Defining Env Variables:
ENV PORT=8080



#EXPOSE to Extern
EXPOSE 8080

#Specify the config file in package.json
CMD ["node", "index.js"]