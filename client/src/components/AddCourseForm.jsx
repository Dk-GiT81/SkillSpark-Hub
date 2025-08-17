import React, { useState } from "react";

export default function AddCourseForm({ onCourseAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onCourseAdded({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add a New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Description */}
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
