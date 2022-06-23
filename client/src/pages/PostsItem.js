import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../query/posts';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import PostsUpdate from '../components/PostsUpdate';
import CommentsCreate from '../components/CommentsCreate';

export default function PostsItem() {
  const [post, setPost] = useState(null);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {variables: { id }});

  useEffect(() => {
    if (!loading) {
      setPost(data.post);
    }
  }, [data]);

  return (
    <div>
      {error && error.message}
      {!(error || loading ) && post && (
        <>
          {user && user.user.id === post.author.id && 
            <button onClick={() => setVisible(true)}>Update Post</button>
          }
          {visible && <Modal visible={visible} setVisible={setVisible}>
              <PostsUpdate title={post.title} body={post.body} id={post.id} setVisible={setVisible}/>
            </Modal>}
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p>by {' '} <Link to={`/users/${post.author.id}`}>{post.author.name}</Link></p>
          <h3>Comments:</h3>
          <ul>
            {post.comments.map(c => <li key={c.id}>{c.text}</li>)}
          </ul>
          { user && <CommentsCreate postId={post.id}/>}
        </>
      )}
    </div>
  );
}
