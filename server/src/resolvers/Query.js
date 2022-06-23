const { getUserId } = require("../utils/auth");

module.exports = {
  users: async (parent, {skip, take,}, { db }) => {
    try {
      return await db.users.findMany({skip, take,});
    } catch (err) {
      console.log(err.message);
    }
  },
  posts: async (parent, {skip, take}, { db }) => {
    try {
      const post = await db.posts.findMany({
        skip, take,
        include: { author: true },
      });
      return post;
    } catch (err) {
      console.log(err.message);
    }
  },
  comments: async (parent, { postId, skip, take, }, { db }) => {
    try {
      return await db.comments.findMany({
        where: { postId: Number(postId) },
        skip, take,
        include: { author: true, post: true },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  me: async (parent, args, {request, db}) => {
    try{
      const userId = getUserId(request);
      
      if (!userId) throw new Error("Authentication error");

      return await db.users.findUnique({where: {id: userId}});
    } catch(err) {console.log(err.message)}
  },
  post: async (parent, {postId}, {db, models}) => {
    try {
      return await db.posts.findUnique({
        where: {id: Number(postId)},
        include: { author: true, comments: true }
      });
    } catch(err) {console.log(err.message)}
  },
  user: async (parent, {id}, {db, models}) => {
    try {
      return await db.users.findUnique({
        where: {id: Number(id)},
        include: { posts: true, comments: true }
      });
    } catch(err) {console.log(err.message)}
  }
};
