import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose, IoPencil, IoCheckmark } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";

function Cards({ data, reference, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);
  const [img, setImg] = useState(data.img);

  const downloadText = () => {
    const content = `Title: ${data.title}\nDescription: ${data.desc}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.title.replace(/\s+/g, "_")}.txt`;
    link.click();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(title, desc, img);
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      className="relative w-64 h-88 rounded-3xl bg-zinc-600 text-white p-6 shadow-lg overflow-hidden"
    >
      <div className="flex items-center gap-3">
        <FaRegFileAlt size={20} />
        <span className="text-lg font-semibold">Note</span>
      </div>
      {isEditing ? (
        <>
          <input
            className="w-full text-lg font-bold bg-transparent border-b border-gray-500 outline-none mt-3 p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full text-sm bg-transparent border border-gray-500 outline-none mt-3 lg:p-2 rounded-md"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            className="w-full text-sm bg-transparent border border-gray-500 outline-none mt-3 lg:p-2 rounded-md"
            placeholder="Enter image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md lg:mt-3 transition"
          >
            Save
          </button>
        </>
      ) : (
        <>
          {img && <img src={img} alt="Card Image" className="w-full h-32 object-cover rounded-md mt-3" />}
          <h3 className="text-lg font-bold mt-4">{data.title}</h3>
          <p className="text-sm text-gray-300 mt-2 font-medium">{data.desc}</p>
        </>
      )}
      <div className="footer bg-blue-300 h-13 p-2 lg:p-2 absolute bottom-0 w-full left-0 flex justify-around px-5">
        {!isEditing && (
          <button
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-300 transition"
            onClick={handleEdit}
          >
            <IoPencil size={16} color="#000" />
          </button>
        )}
        <button
          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
          onClick={onDelete}
        >
          <IoClose size={16} color="#000" />
        </button>
        <button
          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
          onClick={downloadText}
        >
          <LuDownload size={16} color="#000" />
        </button>
      </div>
    </motion.div>
  );
}

export default Cards;
