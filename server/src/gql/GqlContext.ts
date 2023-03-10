import { Request, Response } from "express";
import { PubSub } from "apollo-server-express";
// npm install graphql-postgres-subscriptions --save
// import { PostgresPubSub } from "graphql-postgres-subscriptions";
// export const pubsub = new PostgresPubSub();

export interface GqlContext {
  req: Request;
  res: Response;
  pubsub: PubSub;
//   pubsub: PostgresPubSub;
}
