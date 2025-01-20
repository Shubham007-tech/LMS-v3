# Step 1: Use official Node.js image as base
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the backend files
COPY . .

# Step 5: Expose the backend port
EXPOSE 5000

# Step 6: Run the backend application
CMD ["node", "app.js"]
