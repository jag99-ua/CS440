# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto que usará el API Gateway
EXPOSE 8080

# Comando para iniciar el API Gateway
CMD ["node", "gateway.js"]
