import React, { useRef, useState, useEffect } from 'react';
import Cards from './Cards';

function Foreground() {
  const ref = useRef(null);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('cardsData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cardsData', JSON.stringify(data));
  }, [data]);

  const addCard = () => {
    const title = document.getElementById('cardTitle').value;
    const desc = document.getElementById('cardText').value;
    const img = document.getElementById('cardImg').value; // Get the image URL
    if (!title.trim() || !desc.trim()) return;
    const newData = [
      ...data,
      {
        title,
        desc,
        img,
        filesize: '.9mb',
        close: false,
      },
    ];
    setData(newData);
    document.getElementById('cardTitle').value = '';
    document.getElementById('cardText').value = '';
    document.getElementById('cardImg').value = ''; // Clear the image input
  };

  const deleteCard = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const editCard = (index, title, desc, img) => {
    const newData = [...data];
    newData[index] = { ...newData[index], title, desc, img };
    setData(newData);
  };

  return (
    <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full flex flex-col gap-5 p-5">
      {/* Input Section */}
      <div className="bg-zinc-700 text-white shadow-lg rounded-2xl p-6 w-full lg:w-75">
        <h2 className="text-xl font-semibold mb-4">Create a New Card</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter card title"
            id="cardTitle"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter card description"
            id="cardText"
            className="border p-3 rounded-lg h-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="text"
            placeholder="Enter image URL"
            id="cardImg"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCard}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Card
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex lg:flex gap-5 lg:flex-wrap">
        {data.map((item, index) => (
          <Cards
            key={index}
            data={item}
            reference={ref}
            onDelete={() => deleteCard(index)}
            onEdit={(title, desc, img) => editCard(index, title, desc, img)}
          />
        ))}
      </div>
    </div>
  );
}

export default Foreground;
