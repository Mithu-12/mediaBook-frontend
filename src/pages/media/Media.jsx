import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../../slices/postSlice';
import usePost from '../../hooks/usePost';
import './Media.css';
import LoaderSpiner from '../../components/Loader/LoaderSpiner';

const Media = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const userId = user?._id;

  useEffect(() => {
    setIsLoading(true); 

    axios.get('https://fierce-pear-pelican.cyclic.app/api/post').then((response) => {
      const postData = response.data;
      setPosts(postData);
      dispatch(setPost(postData));
      setIsLoading(false); 
    });
  }, [dispatch]);
if(isLoading){
  return <LoaderSpiner/>
}
  const { handleLike, handleComment } = usePost(posts, setPosts, userId);

  return (
    <div className="py-20 flex justify-center items-center bg-gray-200">
      <div className='basis-7/12'>
        <h1>Social Media App</h1>
        {posts.map((post) => (
          <SinglePost key={post._id} post={post} onLike={handleLike} onComment={handleComment} isLoading={isLoading} /> 
        ))}
      </div>
    </div>
  );
};

export default Media;
