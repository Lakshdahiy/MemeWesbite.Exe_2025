import React from 'react';

function MemeSection({ memes }) {
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
          {meme.Image?<img
            src={meme.Image}
            alt="Meme"
            className="w-full h-auto mb-2"
          />:<></>}
          <p className="text-white">{meme.Caption}</p>
        </div>
      ))}
    </div>
  );
}

export default MemeSection;