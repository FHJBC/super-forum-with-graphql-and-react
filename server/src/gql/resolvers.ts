import { IResolvers } from "apollo-server-express";
// From the Migrating to Apollo Server 3(dièse)Removed exports doc, many types,
// and interfaces has been removed including IResolvers interface
// There are two solutions:
// 1. Run npm install graphql-tools@4.x and import the symbol from graphql-tools.
// 2. Run npm install @graphql-tools/utils and import the IResolvers from @graphql-tools/utils
import CategoryThread from "../repositories/CategoryThread";
import { getTopCategoryThread } from "../repositories/CategoryThreadRepository";
import { QueryArrayResult, QueryOneResult } from "../repositories/QueryArrayResult";
import { Thread } from "../repositories/Thread";
import { ThreadCategory } from "../repositories/ThreadCategory";
import { getAllCategories } from "../repositories/ThreadCategoryRepository";
import { ThreadItem } from "../repositories/ThreadItem";
import { updateThreadItemPoint } from "../repositories/ThreadItemPointRepository";
import {
  createThreadItem,
  getThreadItemsByThreadId,
} from "../repositories/ThreadItemRepository";
import { updateThreadPoint } from "../repositories/ThreadPointRepository";
import {
  createThread,
  getThreadById,
  getThreadsByCategoryId,
  getThreadsLatest,
} from "../repositories/ThreadRepository";
import { User } from "../repositories/User";
import {
  changePassword,
  login,
  logout,
  me,
  register,
  UserResult,
} from "../repositories/UserRepository";
import { GqlContext } from "./GqlContext";

const STANDARD_ERROR = "An error has occurred";
interface EntityResult {
  messages: Array<string>;
}
const resolvers: IResolvers = {
  UserResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "User";
    },
  },
  ThreadResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Thread";
    },
  },
  ThreadItemResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "ThreadItem";
    },
  },
  ThreadArrayResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "ThreadArray";
    },
  },
  ThreadItemArrayResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "ThreadItemArray";
    },
  },
  Query: {
    getThreadById: async (
      obj: any,
      args: { id: string },
      ctx: GqlContext,
      info: any
    ): Promise<Thread | EntityResult> => {
      let thread: QueryOneResult<Thread>;
      try {
        thread = await getThreadById(args.id);

        if (thread.entity) {
          return thread.entity;
        }
        return {
          messages: thread.messages ? thread.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },
    getThreadsByCategoryId: async (
      obj: any,
      args: { categoryId: string },
      ctx: GqlContext,
      info: any
    ): Promise<{ threads: Array<Thread> } | EntityResult> => {
      let threads: QueryArrayResult<Thread>;
      try {
        threads = await getThreadsByCategoryId(args.categoryId);
        if (threads.entities) {
          return {
            threads: threads.entities,
          };
        }
        return {
          messages: threads.messages ? threads.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getThreadsLatest: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<{ threads: Array<Thread> } | EntityResult> => {
      let threads: QueryArrayResult<Thread>;
      try {
        threads = await getThreadsLatest();
        if (threads.entities) {
          return {
            threads: threads.entities,
          };
        }
        return {
          messages: threads.messages ? threads.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getThreadItemByThreadId: async (
      obj: any,
      args: { threadId: string },
      ctx: GqlContext,
      info: any
    ): Promise<{ threadItems: Array<ThreadItem> } | EntityResult> => {
      let threadItems: QueryArrayResult<ThreadItem>;
      try {
        threadItems = await getThreadItemsByThreadId(args.threadId);
        if (threadItems.entities) {
          return {
            threadItems: threadItems.entities,
          };
        }
        return {
          messages: threadItems.messages
            ? threadItems.messages
            : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getAllCategories: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<ThreadCategory> | EntityResult> => {
      let categories: QueryArrayResult<ThreadCategory>;
      try {
        categories = await getAllCategories();
        if (categories.entities) {
          return categories.entities;
        }
        return {
          messages: categories.messages
            ? categories.messages
            : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    me: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<User | EntityResult> => {
      let user: UserResult;
      try {
        if (!ctx.req.session?.userId) {
          return {
            messages: ["User not logged in."],
          };
        }
        user = await me(ctx.req.session.userId);
        if (user && user.user) {
          return user.user;
        }
        return {
          messages: user.messages ? user.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getTopCategoryThread: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<CategoryThread>> => {
      try {
        return await getTopCategoryThread();
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },
  },
  Mutation: {
    createThread: async (
      obj: any,
      args: { userId: string; categoryId: string; title: string; body: string },
      ctx: GqlContext,
      info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Thread>;
      try {
        result = await createThread(
          args.userId,
          args.categoryId,
          args.title,
          args.body
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    createThreadItem: async (
      obj: any,
      args: { userId: string; threadId: string; body: string },
      ctx: GqlContext,
      info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<ThreadItem>;
      try {
        result = await createThreadItem(args.userId, args.threadId, args.body);
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    updateThreadPoint: async (
      obj: any,
      args: { threadId: string; increment: boolean },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let result = "";
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return "You must be logged in to set likes.";
        }
        result = await updateThreadPoint(
          ctx.req.session!.userId,
          args.threadId,
          args.increment
        );
        return result;
      } catch (ex) {
        throw ex;
      }
    },
    updateThreadItemPoint: async (
      obj: any,
      args: { threadItemId: string; increment: boolean },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let result = "";
      try {
        if (!ctx.req.session || !ctx.req.session?.userId) {
          return "You must be logged in to set likes.";
        }
        result = await updateThreadItemPoint(
          ctx.req.session!.userId,
          args.threadItemId,
          args.increment
        );
        return result;
      } catch (ex) {
        throw ex;
      }
    },
    register: async (
      obj: any,
      args: { email: string; userName: string; password: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let user: UserResult;
      try {
        user = await register(args.email, args.userName, args.password);
        if (user && user.user) {
          return "Registration successful.";
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        throw ex;
      }
    },
    login: async (
      obj: any,
      args: { userName: string; password: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let user: UserResult;
      try {
        user = await login(args.userName, args.password);
        if (user && user.user) {
          ctx.req.session!.userId = user.user.id;

          return `Login successful for userId ${ctx.req.session!.userId}.`;
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },
    logout: async (
      obj: any,
      args: { userName: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      try {
        let result = await logout(args.userName);
        ctx.req.session?.destroy((err: any) => {
          if (err) {
            console.log("destroy session failed");
            return;
          }
          console.log("session destroyed", ctx.req.session?.userId);
        });
        return result;
      } catch (ex) {
        throw ex;
      }
    },
    changePassword: async (
      obj: any,
      args: { newPassword: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return "You must be logged in before you can change your password.";
        }
        let result = await changePassword(
          ctx.req.session!.userId,
          args.newPassword
        );

        return result;
      } catch (ex) {
        throw ex;
      }
    },
  },
};

export default resolvers;
