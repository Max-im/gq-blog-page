const { getUserId } = require("../utils/auth");

class Post {
  constructor(db) {
    this.db = db;
  }

  getById(id) {
    return this.db.posts.findUnique({where: {id: Number(id)}});
  }

  async createPost(input, request) {
    const userId = getUserId(request);

    const { title, body, published } = input;
    const data = { title, body, published, author: { connect: { id: userId } } };

    const post = await this.db.posts.create({
      data, include: { author: true }
    });

    return post;
  }

  async update(input, userId, id) {
    const post = await this.getById(id);

    if (String(userId) !== String(post.authorId)) throw new Error('Authorization failed');

    return await this.db.posts.update({
      where: { id: Number(id) },
      data: input,
      include: { author: true },
    });
  }

  async delete(id, request) {
    const userId = getUserId(request);

    const existingPost = await this.getById(id);
    if (String(userId) !== String(existingPost.authorId)) throw new Error('Authorization failed');

    return await this.db.posts.delete({ where: { id: Number(id) }, include: { author: true } });
  }
}

module.exports = Post;
