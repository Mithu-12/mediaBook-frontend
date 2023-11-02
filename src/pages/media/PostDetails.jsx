import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';

const PostDetails = () => {
    const location = useLocation()
    const post = location.state?.data || [];
    const { id } = useParams();
    console.log('post', post, id)
  return (
    <ContentWrapper>
        <div className='py-20'>
        <img className='detailsImage' src={post?.image}/>
        <h1 className='text-3xl font-bold'>Title: {post?.title}</h1>
        <h1 className=' font-bold'>Description: {post?.description}</h1>
    </div>
    </ContentWrapper>
  )
}

export default PostDetails