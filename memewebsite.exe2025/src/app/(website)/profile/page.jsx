"use client";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState } from "react";
import { Trash2 } from "lucide-react"; // Import Trash Icon

const ProfilePage = () => {
  const router = useRouter(); // Initialize router
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Anshuman Thakur");
  const [bio, setBio] = useState("Placeholder Bio");

  // Profile Picture State
  const [profilePic, setProfilePic] = useState("/user-icon.png");

  // Posts State
  const [posts, setPosts] = useState([]);

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-2xl mx-auto my-5 p-5 bg-white rounded-lg shadow-lg">
      {/* Profile Card */}
      <div className="text-center border-b border-gray-300 pb-5 mb-5">
        <div className="flex flex-col items-center">
          {/* Profile Picture Section */}
          <label
            htmlFor="profile-upload"
            className="cursor-pointer flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-300 bg-gray-100"
          >
            {profilePic === "/user-icon.png" ? (
              <span className="text-gray-500 text-sm">
                Add Profile Photo Here
              </span>
            ) : (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />

          {/* Profile Name & Bio */}
          <div className="mt-3">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-gray-600">{bio}</p>
              </>
            )}
          </div>
        </div>
        {/* Edit Profile Button */}
        <div className="flex justify-center gap-4 mt-4">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center text-gray-700 mt-4">
          <div>
            <strong className="block text-lg">{posts.length}</strong> Posts
          </div>
          <div>
            <strong className="block text-lg">15</strong> Upvotes
          </div>
        </div>
      </div>

      {/* Add Post Section */}
      <div className="mb-5 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Create a Post</h3>
        <button
          onClick={() => router.push("/create")}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Post
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative text-center bg-gray-100 p-3 border border-gray-200 rounded-md"
          >
            {/* Delete Icon at Top Right */}
            <button
              onClick={() => handleDeletePost(post.id)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
            >
              <Trash2 size={18} className="text-black-500" />
            </button>

            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-md mb-2"
            />
            <p className="text-gray-800">{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
