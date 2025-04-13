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
   # SERVER
   SERVER_PORT=<your-server-port>
   CLIENT_PORT=<your-client-port>

   # MONGODB
   MONGODB_URI=<your-mongodb-connection-string>
   MONGO_DB_NAME=<your-database-name>

   # DISCORD
   DISCORD_TOKEN=<your-token-string>
   DISCORD_CLIENT_SECRET=<your-client-secret>
   DISCORD_CLIENT_ID=<your-client-id>
   # (Optional) The server (guild) ID where you want to test your slash commands
   DISCORD_GUILD_ID=<your-test-guild-id>
   ```
4. Start the Server:
   ```
   node server.js
   ```
   The server will be running on `http://localhost:3008`.

## API Endpoints
*In Progress / Under Development*

### Bad Words
- `POST api/word/addWord` - Create a new bad word
- `GET api/word/getWord/:word` - Get a specific bad word by word
- `DEL api/word/deleteWord` - Delete a bad word by word