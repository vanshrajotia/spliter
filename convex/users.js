import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // 1. 🌟 UPDATE LINE BELOW: Change index name to "by_token" to match your schema
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    // 2. 🌟 ADD LINE BELOW: Fetch the email from Clerk's profile identity
    const userEmail = identity.emailAddress || identity.email || "";

    if (user !== null) {
      // If we've seen this identity before but the profile changed, patch the values.
      if (user.name !== identity.name || user.email !== userEmail) {
        // 🌟 UPDATE LINE BELOW: Include the missing schema fields during updates
        await ctx.db.patch(user._id, { 
          name: identity.name ?? "Anonymous",
          email: userEmail,
          imageUrl: identity.pictureUrl
        });
      }
      return user._id;
    }
    
    // If it's a new identity, create a new `User`.
    // 🌟 UPDATE BLOCK BELOW: Add 'email' and 'imageUrl' so your schema validator passes
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: userEmail,
      imageUrl: identity.pictureUrl,
    });
  },
});