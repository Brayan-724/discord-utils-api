import Dotenv from "dotenv"
import Path from "path"
import Express from "express"
import Http from "http"
import Fs from "fs"
import AvatarRoute from "./routes/avatar.js"
import UserRoute from "./routes/user.js"
import * as Constants from "./constants.js"

if(Fs.existsSync(Constants.cacheDir))
  Fs.rmSync(Constants.cacheDir, {
    recursive: true
  });

if(process.env.NODE_ENV !== "production") {
  Dotenv.config({ path: Path.join(process.cwd(), ".env") });
}


// Initialize Server

const app: Express.Express = Express();
const server: Http.Server = Http.createServer(app);

const PORT: number = parseInt(process.env.PORT, 10) || 1406;


//* Endpoints
AvatarRoute(app);
UserRoute(app);


// Run server
server.listen(PORT, () => {
  console.log("Listening on ", PORT);
})
