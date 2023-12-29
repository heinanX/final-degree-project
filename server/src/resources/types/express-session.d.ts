import session from 'express-session';

declare module "express-session" {
  interface SessionData {
    customer: {
      _id: string,
      isAdmin: boolean,
      mail: string
    }
  }
}
