
import axios from 'axios';
import { useState } from 'react';

const usePost = (posts, setPosts, userId) => {

    
  const handleLike = (postId) => {
    // Send a request to your server to record the like
    axios
      .post(`https://fierce-pear-pelican.cyclic.app/api/post/like/${postId}`, { userId: userId })
      .then((response) => {
        // Update the likes for the post on the frontend
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              likes: response.data.likes,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const handleComment = (postId, commentText) => {
    // Send a request to your server to add a comment to the post
    axios
      .post(`https://fierce-pear-pelican.cyclic.app/api/post/comment/${postId}`, { text: commentText, userId: userId })
      .then((response) => {
        // Update the comments for the post on the frontend
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: response.data.comments,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return { handleLike, handleComment };
};

export default usePost;
