import { DataSource } from "typeorm";
import { loadEnv } from "./common/envLoader";

loadEnv();

export const AppDataSource = new DataSource({ 
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: ["repositories/**/*.*"],
    // entities: ["entities/*.ts"]
    // entities: [process.env.PG_ENTITIES],


    // Prerequisite: Installing CLI
    // $ npm i -g typeorm
    // Entities files are in TypeScript
    // $ npm i ts-node --save-dev
    // Add typeorm command under scripts section in package.json
    // "scripts":  { 
    //     ...
    //     "typeorm": "typeorm-ts-node-commonjs"
    // }


    // migrations: [/* ... */],
    // migrationsTableName: "custom_migration_table",
    logging: true,
    synchronize: true,
});