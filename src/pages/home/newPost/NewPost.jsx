
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './NewPost.css'
import LoaderSpiner from '../../../components/Loader/LoaderSpiner';


const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const imageApi = import.meta.env.VITE_IMAGE_UPLOAD;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageApi}`;
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: null,
    user: userId,
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostData({ ...postData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('image', postData.image);

    fetch(imageHostingUrl, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imageUrl = imageResponse.data.display_url;
          const newPostData = { ...postData, image: imageUrl };
          axios
            .post('http://localhost:5000/api/post', newPostData)
            .then((response) => {
              console.log('Post created:', response.data);
              // Clear the input fields
              setPostData({
                title: '',
                description: '',
                image: null,
                user: userId,
              });
            })
            .catch((error) => {
              console.error('Error creating post:', error);
            })
            .finally(() => {
              setIsLoading(false); // Reset loading state
            });
        }
      });
  };

  return (
    <div className="new-post-form my-8">
    <h2 className='text-2xl font-bold'>Create New Post</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="input-field"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="input-field"
          placeholder="Description"
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
          required
        />
      </div>
      <div className="">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          className="input-field"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
          required
        />
      </div>
      <button  type="submit" disabled={isLoading} className="NewButton bg-amber-500">
        {isLoading ? 'Creating Post...' : 'Create Post'}
      </button>
      {isLoading ? <LoaderSpiner/>: null}
    </form>
  </div>
  
  );
};

export default NewPost;






























// // components/NewPostForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux'


// const NewPost = () => {
//     const user = useSelector((state)=> state.auth.user)
//     const userId = user._id
//     const imageApi = import.meta.env.VITE_IMAGE_UPLOAD
//     const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageApi}`
//   const [postData, setPostData] = useState({
//     title: '',
//     description: '',
//     image: null, 
//     user: userId
//   });
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPostData({ ...postData, image: file });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', postData.title);
//     formData.append('description', postData.description);
//     formData.append('image', postData.image);
//     fetch(imageHostingUrl, {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((imageResponse) => {
//         if (imageResponse.success) {
//           const imageUrl = imageResponse.data.display_url;
//           const newPostData = { ...postData, image: imageUrl };
//           // Make the POST request with Axios inside this block
//           axios.post('http://localhost:5000/api/post', newPostData)
//             .then((response) => {
//               console.log('Post created:', response.data);
//             })
//             .catch((error) => {
//               console.error('Error creating post:', error);
//             });
//         }
//       });
//   };
  

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('title', postData.title);
//   //     formData.append('description', postData.description);
//   //     formData.append('image', postData.image);

//   //     const response = await axios.post('http://localhost:5000/api/post', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     console.log('Post created:', response.data);
//   //   } catch (error) {
//   //     console.error('Error creating post:', error);
//   //   }
//   // };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='flex flex-col'>
//       <input
//         type="text"
//         placeholder="Title"
//         value={postData.title}
//         onChange={(e) => setPostData({ ...postData, title: e.target.value })}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={postData.description}
//         onChange={(e) => setPostData({ ...postData, description: e.target.value })}
//         required
//       />
//       <input
//           type="file"
//           placeholder="Image URL"
//           accept=".jpg, .jpeg, .png" // Restrict accepted file types
//           onChange={handleFileChange} // Handle file input change
//           required
//         />
//       <button type="submit">Create Post</button>
//       </div>
//     </form>
//   );
// };

// export default NewPost;
