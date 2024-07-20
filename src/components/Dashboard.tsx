import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [rank, setRank] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bps, setBps] = useState(0);
  const [bananas, setBananas] = useState(0);

  useEffect(() => {
    // Fetch data from Firebase and set state
  }, []);

  const handleTap = () => {
    setBananas(bananas + bps);
    // Update in Firebase
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{username}</h1>
          <p>Rank: {rank}</p>
          <div className="w-full bg-gray-200 rounded-full">
            <div className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: `${progress}%` }}> {progress}% </div>
          </div>
        </div>
        <div className="flex items-center">
          <select className="border p-2 rounded">
            <option>Börse 1</option>
            <option>Börse 2</option>
          </select>
          <p className="mx-4">BPS: {bps}</p>
          <button className="p-2 rounded bg-gray-200">⚙️</button>
        </div>
      </div>
      <div className="my-4 text-center">
        <p className="text-2xl">{bananas} 🍌</p>
        <button className="bg-yellow-500 text-white p-4 rounded-full animate-bounce" onClick={handleTap}>Tap me!</button>
      </div>
      <div className="mt-4">
        <p>Energy: {progress}%</p>
        <div className="w-full bg-gray-200 rounded-full">
          <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: `${progress}%` }}> {progress}% </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
