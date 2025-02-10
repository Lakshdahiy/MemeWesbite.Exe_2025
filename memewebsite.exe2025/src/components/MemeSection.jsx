import React, { use, useState } from 'react';
import Upvoteicon from '../../public/upvote.svg';
import Upvotedicon from '../../public/upvoted.svg';
import { Chat } from 'react-bootstrap-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'react-bootstrap-icons';
import { format } from 'date-fns';
import axios from 'axios';

function MemeSection({ memes, user, handleUpvote,handleComment }) {
  if (!Array.isArray(memes)) {
    return <div className="p-4 text-white">No memes available</div>;
  }

  const [isCommentModalOpen, setIsCommentModalOpen] = useState('');
  const [comment, setComment] = useState("");
  const [Comments, setComments] = useState([]);
  const fetchComments = async (id) => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/comments/get/${id}`).then((response) => {
      setComments(response.data.data);
    }).catch((error) => {
      console.log('Error fetching comments:', error);
    }
    );
      
  }

  return (
    <div className="p-4">
      {memes.map(meme => (
        <div key={meme._id} className="lg:max-w-xl md:max-w-md max-w-sm mx-auto shadow-md rounded-lg px-4 py-6 mb-4 border border-gray-800">
          <div className="flex items-center ">
            <img
              src={meme.User.avatar}
              alt="User"
              className="w-8 h-8 rounded-full mr-2 "
            />
            <span className="font-semibold text-white">{meme.User.name}</span>
          </div>
          <span className='text-gray-500 text-xs mb-5 ml-10'>{format(new Date(meme.createdAt), 'dd MMM yyyy')}</span>
          <h1 className="text-xl my-2 font-semibold text-white">{meme.Title}</h1>
          {meme.Image ? (
            <img
              src={meme.Image}
              alt="Meme"
              className="w-full h-auto mb-2"
            />
          ) : (
            <></>
          )}
          <p className="text-white my-3">{meme.Caption}</p>
          <div className="flex justify-start mt-8">
            <div className="w-1/6 flex flex-col items-center">
              {!meme.Upvotes.includes(user) ? (
                <Upvoteicon onClick={() => handleUpvote(meme._id, false)} style={{ fill: "white", cursor: "pointer", width: 30, height: 30 }} />
              ) : (
                <Upvotedicon onClick={() => handleUpvote(meme._id, true)} style={{ fill: "#c084fc", cursor: "pointer", width: 30, height: 30 }} />
              )}
              <span className="text-white text-xs mt-2">{meme.Upvotes.length} {meme.Upvotes.length === 1 ? "Upvote" : "Upvotes"}</span>
            </div>
            <div className="w-1/6 sm:w-1/4 flex flex-col items-center">
              <Chat onClick={() => {setIsCommentModalOpen(meme._id)
              fetchComments(meme._id)
              }} style={{ fill: "white", cursor: "pointer", width: 30, height: 30 }} />
              <span className="text-white text-xs mt-2">{meme.Comments.length} {meme.Comments.length === 1 ? "Comment" : "Comments"}</span>
            </div>
          </div>
          <AnimatePresence>
            {isCommentModalOpen==meme._id && (
              
              <motion.div
                initial={{ translateY: -50 ,opacity: 0 }}
                animate={{ translateY:0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-black flex items-center justify-center flex-col mt-10"
              >
                
                  <div className="flex justify-between items-center mb-4 w-full">
                    <h1 className="text-white font-bold">Comments</h1>
                    <X onClick={() => setIsCommentModalOpen(false)} style={{ fill: "white", cursor: "pointer" }} />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {Comments.map(comment => (
                      <div key={comment._id} className="bg-gray-800 p-2 rounded-lg">
                        <p className="text-white">{comment.User.name}</p>
                        <p className="text-white">{comment.Description}</p>
                      </div>
                    ))}
                  
                  </div>
                  <div className="flex justify-between items-center w-full mt-4">
        
                    <input type="text" value={comment} placeholder="Add a comment" className="bg-gray-800 text-white p-2 rounded-lg w-3/4"  onChange={(e)=>{setComment(e.target.value)}}/>
                    <button onClick={()=>{handleComment(meme._id,comment,()=>{fetchComments(meme._id)})
                      
                    }} className="bg-[#c084fc] text-white text-lg p-2 rounded-lg w-1/4 ml-2">Post</button>
                  </div>
                
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      ))}
    </div>
  );
}

export default MemeSection;