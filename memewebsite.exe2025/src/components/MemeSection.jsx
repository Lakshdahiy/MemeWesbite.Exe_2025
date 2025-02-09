import React from 'react';

function MemeSection({ memes }) {
  if (!Array.isArray(memes)) {
    return <div className="p-4 text-white">No memes available</div>;
  }

  return (
    <div className="p-4">
      {memes.map(meme => (
        <div key={meme.id} className="max-w-md mx-auto bg-white shadow-md rounded p-4 mb-4">
          <div className="flex items-center mb-3">
            <img
              src={meme.userProfileImage}
              alt="User"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{meme.userName}</span>
          </div>
          <img
            src={meme.imageUrl}
            alt="Meme"
            className="w-full h-auto mb-2"
          />
          <p className="text-gray-700">{meme.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default MemeSection;