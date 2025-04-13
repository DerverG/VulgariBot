# VulgariBot
 A Discord Bot that detects bad words.

## Usage
### Client
*In Progress / Under Development*

### Server
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the next:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   MONGO_DB_NAME=<your-database-name>
   SERVER_PORT=<your-server-port>
   CLIENT_PORT=<your-client-port>
   ```
4. Start the Server:
   ```
   node server.js
   ```
   The server will be running on `http://localhost:3008`.

### Discord Bot
1. Navigate to the discord bot directory:
   ```
   cd bot
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   CLIENT_SECRET=<your-client-secret>
   CLIENT_ID=<your-client-id>
   TOKEN=<your-token-string>
   # (Optional) The server (guild) ID where you want to test your slash commands
   GUILD_ID=<your-guild-id>
   ```
4. Start the Discord Bot:
   ```
   node ./src/index.js
   ```

## API Endpoints
*In Progress / Under Development*