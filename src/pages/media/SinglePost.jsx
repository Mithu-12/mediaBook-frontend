// Post.js
import React, { useState } from 'react';
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SinglePost.css'
import LoaderSpiner from '../../components/Loader/LoaderSpiner';
import { Link } from 'react-router-dom';

const SinglePost = ({ post, onLike, onComment, isLoading }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLikeClick = () => {
    onLike(post?._id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(post?._id, commentText);
    setCommentText('');
  };

  return (
    <div className="single-post py-12 px-10 my-8 bg-white shadow">
      
      <img  src={post?.image} alt="Post" />
      <p className='text-2xl py-3 font-bold'>{post?.title}</p>
      <p className='py-2'>{post?.description}</p>

      <div className='py-4'>
        <button onClick={handleLikeClick}>
        {isLoading ? (
            <LoaderSpiner /> 
          ) : (
            <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: "#2c54f2" }} />
          )}
        </button>
        {/* <button onClick={() => setShowLikes(!showLikes)}>
          {showLikes ? 'Hide Likes' : 'View Likes'}
        </button> */}
        <span className='pl-3 '>{post?.likes?.length} Likes</span>
        <span className='pl-12 '>{post?.comments?.length} Coments</span>
        {showLikes && (
         
          <ul>
            {post?.likes?.map((like, index) => (
              <li key={index}>{like.userName}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button className='bg-amber-500 px-8 py-3 my-3 rounded' type="submit">Submit</button>
        </form>
        <div className='flex justify-between items-center'>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Hide Comments' : 'View Comments'}
        </button>
        {/* <Link to={} state: { data: searchData } >Details</Link> */}
        <Link className='bg-amber-500 py-3 rounded px-7' to={`/postDetails/${post?._id}`} state={{ data: post }}>Details</Link>

        </div>
        {showComments && (
         
          <ul>
            {post?.comments?.map((comment, index) => (
              <li key={index}>{comment.text}</li>
        ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
