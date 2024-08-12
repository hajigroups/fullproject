import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import Contact from './components/Contact';
import Home from './components/Home';
import About from './components/About';
import End from './components/end';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';



function App() {
  // State to manage the posts, initialized from localStorage
  const [posts, setPosts] = useState(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    return storedPosts || [];
  });

  // States to manage form inputs
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  // Function to add a new post
  const handleAddPost = () => {
    if (newPostTitle.trim() !== '' && newPostContent.trim() !== '' && newPostImage) {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        image: newPostImage,
      };
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImage(null);

      // Update localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    } else {
      alert('Please enter title, content, and select an image.');
    }
  };

  // Function to set up editing a post
  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setNewPostTitle(postToEdit.title);
    setNewPostContent(postToEdit.content);
    setNewPostImage(postToEdit.image);
    setEditMode(true);
    setCurrentPostId(postId);
  };

  // Function to save edited post
  const handleSaveEdit = () => {
    const updatedPosts = posts.map((post) =>
      post.id === currentPostId
        ? { ...post, title: newPostTitle, content: newPostContent, image: newPostImage }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostImage(null);
    setEditMode(false);
    setCurrentPostId(null);
  };

  // Function to delete a post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Effect to load posts from localStorage on component mount
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);


  return (
  
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main h-[80vh]">
                  <div className="flex mt-10">
                    <div className="mt-20">
                      <h1 className="m-3 text-2xl hover:font-bold transition ease-in delay-[0.2s] duration-500 hover:translate-x-[15%] text-red-600 mb-2">
                        Suleman Groups
                      </h1>
                      <p className="hover:bg-gray-200 w-[60%] m-2 p-2 border-[2px] transition delay-[0.5s] text-black hover:text-white duration-300 hover:translate-y-5 flex text-justify border-gray-600 rounded-xl">
                        Suleman Groups excels in real estate, specializing in finding homes, land, and properties
                        tailored to clients' needs. With a reputation for integrity and personalized service, they guide
                        clients through every step of their real estate journey, ensuring satisfaction and successful
                        transactions.
                      </p>
                    </div>
                    <div id="carouselExample" className="carousel slide w-[184%] rounded-full mr-4">
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img src="/public/house.png" className="d-block" alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src="/public/home4.png" className="d-block w-100 h-[70%]" alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src="/public/home6.png" className="d-block w-100" alt="" />
                        </div>
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-[50%] m-2 bg-gray-50">
                  <h1 className='text-2xl ml-4 mb-4 '>Add New Post</h1>
                  <div className="border p-4 mb-4">
                    <input
                      type="text"
                      className="w-full mb-2 p-2 rounded border border-gray-300"
                      placeholder="Enter Post Title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <textarea
                      className="w-full mb-2 p-2 rounded border border-gray-300"
                      rows="4"
                      placeholder="Enter Post Content"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    ></textarea>
                    <input type="file" className="mb-2" accept="image/*" onChange={handleImageChange} />
                    {editMode ? (
                      <button className="btn-save-post" onClick={handleSaveEdit}>
                        Save Edit
                      </button>
                    ) : (
                      <button className="btn-add-post" onClick={handleAddPost}>
                        Save Post
                      </button>
                    )}
                  </div>
                  {posts.map((post) => (
                    <div key={post.id} className="border p-4 mb-4 text-pretty  ">
                      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                      <p>{post.content}</p>
                      {post.image && <img src={post.image} alt="Post" className="w-full mt-2" />}
                      <button onClick={() => handleEditPost(post.id)} className="btn-edit-post mt-8 ml-7 text-black text-xl hover:font-bold border border-black rounded p-1 w-[10%]  ">Edit</button>
                      <button onClick={() => handleDeletePost(post.id)} className="btn-delete-post mt-2 ml-[10%] text-black text-xl hover:font-bold border border-black rounded p-1 w-[10%] ">Delete</button>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
      <End />
    </>

  );
}

export default App;
