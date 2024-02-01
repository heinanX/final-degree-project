import session from "express-session";

// Extend the SessionData interface in the "express-session" module
declare module "express-session" {
  // Add a custom property named 'customer' to the session data
  interface SessionData {
    customer: {
      _id: string; // Customer's ID
      isAdmin: boolean; // Indicates if the customer is an admin
      mail: string; // Customer's email
      stripe_id: string; // Customer's Stripe ID
    };
  }
}
