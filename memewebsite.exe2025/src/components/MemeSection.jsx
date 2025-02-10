'use client'
import React, { useState,useEffect } from 'react';
import Upvoteicon from '../../public/upvote.svg';
import Upvotedicon from '../../public/upvoted.svg';


function MemeSection({ memes, user ,handleUpvote}) {
  
  if (!Array.isArray(memes)) {
    return <div className="p-4 text-white">No memes available</div>;
  }
  
  

  return (
    <div className="p-4">
      {memes.map(meme => (
        <div key={meme._id} className="max-w-md mx-auto  shadow-md rounded p-4 mb-4">
          <div className="flex items-center mb-3">
            <img
              src={meme.User.avatar}
              alt="User"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold text-white">{meme.User.name}</span>
          </div>
          <h1 className="text-xl  my-2 font-semibold text-white">{meme.Title}</h1>
          {meme.Image?<img
            src={meme.Image}
            alt="Meme"
            className="w-full h-auto mb-2"
          />:<></>}
          <p className="text-white">{meme.Caption}</p>
          {/* <div className="flex justify-between mt-4"> */}

          <div className="flex justify-between mt-4">
            <div className="flex flex-col items-center">
              {/* <Image src={upvoteicon} alt="Upvote" height={35} width={35} className=" mr-1 " /> */}
              {!meme.Upvotes.includes(user) ? <Upvoteicon onClick={()=>handleUpvote(meme._id,false)} style={{ fill:"white", cursor: "pointer", width: 35, height: 35 }} />
              :<Upvotedicon onClick={()=>handleUpvote(meme._id,true)} style={{ fill:"#c084fc", cursor: "pointer", width: 35, height: 35 }} />}
              <span className="text-white text-xs"> {meme.Upvotes.length} Upvotes</span>
              
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default MemeSection;