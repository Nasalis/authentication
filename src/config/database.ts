import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

export class PrismaORM {
  private static _instance: PrismaORM | null = null;
  private readonly client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
  }

  static get instance() {
    if (!PrismaORM._instance) {
      PrismaORM._instance = new PrismaORM();
    }
    return PrismaORM._instance;
  }

  public get getClient() {
    return this.client;
  }

  public connectDatabase = async () => {
    try {
      await this.client.$connect();
      console.log("DB connected via Prisma");
    } catch (error) {
      console.log("Database connection error:", error);
      process.exit(1);
    }
  };

  public disconnectDatabase = async () => {
    await this.client.$disconnect();
  };
}
