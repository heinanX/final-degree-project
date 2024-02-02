import session from "express-session";

/*  EXTEND SessionData INTERFACE IN THE "EXPRESS-SESSION" MODULE */

declare module "express-session" {
  interface SessionData {
    customer: {
      _id: string;
      isAdmin: boolean;
      mail: string;
      stripe_id: string;
    };
  }
}
