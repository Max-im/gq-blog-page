const { getUserId } = require("../utils/auth");

module.exports = {
  count: {
    subscribe: (parent, args, {pubsub}) => pubsub.subscribe('count')
  },
  comment: {
    subscribe: (parent, {postId}, {pubsub}) => pubsub.subscribe(`comment:${postId}`)
  },
  post: {
    subscribe: (parent, args, {pubsub}) => pubsub.subscribe('post')
  },
  myPost: {
    subscribe: (parent, args, {request, pubsub}) => {
      try {
        const userId = getUserId(request);

        return pubsub.subscribe(`myPost:${userId}`);
      } catch(err){console.log(err.message)}
    }
  }
};
