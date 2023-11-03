import React, { useState } from 'react'
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper'
import { useSelector } from 'react-redux'
import UserModal from '../../components/userModal/UserModal'
import './About.css'
const About = () => {
  const user = useSelector((state) => state.auth.user)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditUser = () => {
    setIsModalVisible(true);
  };

  return (
    <ContentWrapper>
      {isModalVisible && <UserModal setIsModalVisible={setIsModalVisible} />}
      <div className='about-container'>
        <button onClick={handleEditUser} className='about-edit-button'>
          Edit
        </button>
      </div>
      <div className='about-info'>
        <p className='about-info-item'>Name: {user?.name || ''}</p>
        <p className='about-info-item'>Email: {user?.email || ''}</p>
        <p className='about-info-item'>University: {user?.university || ''}</p>
        <p className='about-info-item'>Address: {user?.address || ''}</p>
      </div>
    </ContentWrapper>
  )
}

export default About;
