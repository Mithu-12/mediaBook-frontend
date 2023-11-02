import React, { useEffect, useState } from 'react';
import './UserModal.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import axios from 'axios'
import LoaderSpiner from '../Loader/LoaderSpiner';
const UserModal = ({ setIsModalVisible }) => {
    const dispatch = useDispatch()
const [message, setMessage] = useState(null);
const [loading, setLoading] = useState(false)
const user = useSelector((state)=> state.auth.user)
const userId = user?._id;
const token = localStorage.getItem('access_token');
  const navigate = useNavigate()
  const [userUpdate, setUserUpdate] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    address: user?.address || '',
  })



const handleUserChange = (field, value)=>{
    setUserUpdate({
        ...userUpdate,
        [field]: value
    })
}

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  setLoading(true)
   
    axios
      .put(`https://fierce-pear-pelican.cyclic.app/api/users/${userId}`, userUpdate, {
        headers,
        withCredentials: true,
      })
      .then((response) => {
        const usersUpdate = {
          ...user,
          ...userUpdate,
        };
        dispatch(setUser(usersUpdate))
        setMessage('user update successfully')
        console.log('user',usersUpdate)

      })
      
      .catch((error) => {
        console.error('Error updating user data:', error);
        setMessage('Error to Update')
        // Handle errors here
      })
      .finally(() => {
        setLoading(false); 
      });
  };
 
console.log(userUpdate)

  return (
    <div>
      
        <div className="modal-background">
          <div className="modal-container">
          <div className="titleCloseBtn flex justify-between items-center">
            <h2 className='text-2xl font-bold'>Edit User</h2>
           
          <button className='p-2 w-12 h-12 rounded-full bg-zinc-400 '
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            X
          </button>
        </div>
          <div>
          <div className='modal-input'>
          <p>Name</p>
          <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="profile-input-width"
                  value={userUpdate?.name || ''}
                  onChange={(e) =>
                    handleUserChange('name', e.target.value)
                  }
                  required
                />
          </div>
          <div className='modal-input'>
          <p>Email</p>
          <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  className="profile-input-width"
                  value={userUpdate?.email || ''}
                  onChange={(e) =>
                    handleUserChange('email', e.target.value)
                  }
                  required
                />
          </div>
          <div className='modal-input'>
          <p>University</p>
          <input
                  type="text"
                  name="university"
                  placeholder="Enter Your University"
                  className="profile-input-width"
                  value={userUpdate?.university || ''}
                  onChange={(e) =>
                    handleUserChange('university', e.target.value)
                  }
                  required
                />
          </div>
          <div className='modal-input'>
          <p>Address</p>
          <input
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  className="profile-input-width"
                  value={userUpdate?.address || ''}
                  onChange={(e) =>
                    handleUserChange('address', e.target.value)
                  }
                  required
                />
          </div>
          </div>




          {loading ? <LoaderSpiner/> : null}
          {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}
            <button onClick={handleSubmit} className="modal-button">Save</button>
          </div>
        </div>
      
    </div>
  );
};

export default UserModal;
