# Step 1: Use official Node.js image as base
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the frontend files
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Expose the port for frontend (default is 3000)
EXPOSE 3000

# Step 7: Serve the app using a simple static server (optional)
CMD ["npx", "serve", "build"]
