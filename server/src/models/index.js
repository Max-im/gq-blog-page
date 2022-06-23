import User from './User';
import Post from './Post';
import Comment from './Comment';


module.exports = (db) => ({
    user: new User(db),
    post: new Post(db),
    comment: new Comment(db)
});