import express from "express";
// import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
// import typeDefs from "./gql/typeDefs";
// import resolvers from "./gql/resolvers";
import cors from "cors";

import { register } from "./repositories/UserRepository";

import { loadEnv } from "./common/envLoader";
import { AppDataSource } from "./AppDataSource";

loadEnv();


// establish database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    })


const main = async () => {
    
    // create and setup express app
    const app = express();

    app.use(express.json());

    app.use(
        cors({
            credentials: true,
            origin: process.env.CLIENT_URL,
        })
    );
    
    const router = express.Router();

    // register routes
    router.post("/register", async (req, res, next) => {
        try {
            // console.log("params", req.body);
            const userResult = await register(req.body.email, req.body.userName, req.body.password);
    
            if (userResult && userResult.user) {
                res.send(`new user created, userId: ${userResult.user.id}`);
            } else if (userResult && userResult.messages) {
                res.send(userResult.messages[0]);
            } else {
               next();
            }
        } catch (ex: any) {
            res.send(ex.message);
        }
    });

    app.use(router);

    // const schema = makeExecutableSchema({ typeDefs, resolvers });
    // const apolloServer = new ApolloServer({
    //     schema,
    //     context: ({ req, res }: any) => ({ req, res }),
    // });
    // apolloServer.applyMiddleware({ app, cors: false });

    // start express server
    app.listen({ port: process.env.SERVER_PORT }, () => {
        console.log(
           `Server ready at http://localhost:${process.env.SERVER_PORT}`
        );
    });
}

main();



