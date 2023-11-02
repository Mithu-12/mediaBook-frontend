import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SinglePost from './SinglePost'
import axios from 'axios'
import { setPost } from '../../slices/postSlice'
import usePost from '../../hooks/usePost'

const TopPost = () => {
    // const posts = useSelector((state)=> state.post.posts)
    const user = useSelector((state)=> state.auth.user)
    const userId = user._id;
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('https://fierce-pear-pelican.cyclic.app/api/post').then((response) => {
          const postData = response.data
          setPosts(postData)
          dispatch(setPost(postData))
        });
      }, []);

      const { handleLike, handleComment } = usePost(posts, setPosts, userId);

      const sortedPosts = [...posts].sort((a, b) => b.likes.length - a.likes.length);

    const newPost = sortedPosts?.slice(0, 3)
    console.log(posts)
    console.log(newPost)

  return (
    <div>
        {newPost?.map((post) => (
        <SinglePost key={post._id} post={post} onLike={handleLike} onComment={handleComment} />
      ))}
    </div>
  )
}

export default TopPost