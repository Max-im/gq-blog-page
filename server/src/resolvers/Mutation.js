import {getUserId} from '../utils/auth';
import CustomError from '../errors/CustomError'

module.exports = {
  createUser: async (parent, {input}, { models }) => {
    try {
      return await models.user.signup(input);
    } catch(err) { throw new CustomError(err.message)}
  },
  login: async (parent, {input}, { models }) => {
    try {
      return await models.user.login(input);
    } catch(err) { throw new CustomError(err.message)}
  },
  updateUser: async (parent, { input }, { models, request }) => {
    try {
      return await models.user.update(input, request);
    } catch(err) { throw new CustomError(err.message)}
  },
  deleteUser: async (parent, args, { models, request }) => {
    try {
      return await models.user.update(request);
    } catch(err) { throw new CustomError(err.message)}
  },
  createPost: async (parent, { input }, { models, pubsub, request }) => {
    try {
      const post = await models.post.createPost(input, request);

      pubsub.publish('post', {post: { mutation: 'CREATED', data: post }});

      return post;
    } catch(err) { throw new CustomError(err.message)}
  },
  updatePost: async (parent, { id, input }, { models, request, pubsub }) => {
    try {
      const userId = getUserId(request);
      const post =  await models.post.update(input, userId, id);

      pubsub.publish('post', {post: { mutation: 'UPDATED', data: post }});
      pubsub.publish(`myPost:${userId}`, {myPost: { mutation: 'UPDATED', data: post }});
      
      return post;
    } catch(err) { throw new CustomError(err.message)}
  },
  deletePost: async (parent, { id }, { models, pubsub, request }) => {
    try {
      const post = await models.post.delete(id, request);
      
      if (post.published) {
        pubsub.publish('post', { post: { mutation: 'DELETED', data: post } });
      }
      
      return post;
    } catch (err) { console.log(err.message) }
  },
  createComment: async (parent, { input }, { pubsub, models, request }) => {
    try {
      const comment = await models.comment.create(input, request, models.post);
      
      pubsub.publish(`comment:${input.post}`, { mutation: 'CREATED', data: comment });

      return comment;
    } catch(err) { throw new CustomError(err.message)}
  },
  updateComment: async (parent, { id, input }, { request, models }) => {
    try {
      return await models.comment.update(input, request, id);
    } catch(err) { throw new CustomError(err.message)}
  },
  deleteComment: async (parent, { id }, { pubsub, request }) => {
    try {
      const comment = await models.comment.delete(input, request, id);

      pubsub.publish('comment', { comment: { mutation: 'DELETED', data: comment } });
      
      return comment;
    } catch(err) { throw new CustomError(err.message)}
  },
};
