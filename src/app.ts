import express, {
  type Application as ExApp,
  type Request,
  type Response,
} from "express";
import { PrismaORM } from "./config/database.js";
import { AuthRoutes } from "./routes/authRoutes.js";
import { WatchListRoutes } from "./routes/watchlistRoutes.js";

class App {
  private readonly instance: ExApp;
  private readonly authRoutes: AuthRoutes;
  private readonly watchlistRoutes: WatchListRoutes;

  constructor() {
    this.instance = express() as ExApp;
    this.instance.use(express.json());
    this.instance.use(express.urlencoded({ extended: true }));

    this.authRoutes = new AuthRoutes();
    this.watchlistRoutes = new WatchListRoutes();

    this.registerRoutes();
  }

  public async run() {
    const prisma = PrismaORM.instance;
    await prisma.connectDatabase();
    const PORT = process.env.PORT;
    this.instance.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`),
    );
  }

  private registerRoutes() {
    this.instance.get("/health", (request: Request, response: Response) => {
      response.status(200).json({
        status: 200,
        message: "Everything is okay!",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    this.instance.use("/auth", this.authRoutes.router);
    this.instance.use("/watchlist", this.watchlistRoutes.router);
  }
}

export default App;
