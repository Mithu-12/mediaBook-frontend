import React from 'react'
import NewPost from './newPost/NewPost'
import TopPost from '../media/TopPost'
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper'

const Home = () => {
  return (
    <ContentWrapper>
      <div className='pt-24 flex'>
     <div className='basis-5/12'>
     <NewPost/>
     </div>
      <div className='basis-7/12'>
      <TopPost/>
      </div>
    </div>
    </ContentWrapper>
  )
}

export default Home