import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [state, setState] = useState({
    file: null,
    message: ''
  });

  const handleFileChange = (event) => {
    setState({ ...state, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', state.file);

    try {
      const response = await axios.post('https://wedding-memories-server-1xhfzhmfz-alif-danishs-projects.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setState({ ...state, message: response.data });
    } catch (error) {
      console.error(error);
      setState({ ...state, message: error.response ? error.response.data : 'Error uploading file' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Upload Image to Google Drive</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
      {state.message && <p className="mt-4">{state.message}</p>}

    </div>
  );
}

export default App;
