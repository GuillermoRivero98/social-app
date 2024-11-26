import React, { useState, useEffect, useContext } from "react";
import { getFeed, likePost } from "../services/postService";
import AuthContext from "../context/AuthContext";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed(user.token);
        setPosts(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchFeed();
  }, [user.token]);

  const handleLike = async (postId) => {
    try {
      await likePost(postId, user.token);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageUrl} alt={post.caption} />
          <p>{post.caption}</p>
          <button onClick={() => handleLike(post._id)}>❤️ {post.likes}</button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
