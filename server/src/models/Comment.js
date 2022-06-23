const { getUserId } = require("../utils/auth");

class Comment {
    constructor(db) {
      this.db = db;
    }

    async findById(id) {
        return this.db.comments.findUnique({where: {id: Number(id)}});
    }
  
    async create(input, request, postModel) {
        const userId = getUserId(request);
  
        const { post, text } = input;
  
        const postItem = await postModel.getById(post);
        // if (!(postItem && postItem.published)) throw new Error('The Post Not Found');
  
        const data = { post: {connect: {id: Number(post)}}, text, author: {connect: {id: userId}} };
        return await this.db.comments.create({ data, include: { post: true, author: true } });
    }
  
    async update(input, request, id) {
        const userId = getUserId(request);

        const existingComment = await this.findById(id);
        if (String(userId) !== String(existingComment.authorId)) throw new Error('Authorization failed');
  
        const data = {};
        if (input.text) data.text = input.text;
        if (input.author) data.authorId = Number(input.author);
        if (input.post) data.postId = Number(input.post);
  
        return await this.db.comments.update({
          where: { id: Number(id) },
          data,
          include: { author: true, post: true },
        });
    }
  
    async delete(id, request) {
        const userId = getUserId(request);

        const existingComment = await await this.findById(id)
        if (String(existingComment.authorId) !== String(userId)) throw new Error('Permission denied');
  
        return await this.db.comments.delete({
          where: { id: Number(id) },
          include: { author: true, post: true },
        });
    }
  }
  
  module.exports = Comment;
  