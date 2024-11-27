// src/components/settings/EditProfileForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-gray-300'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded'
        />
      </div>
      <div>
        <label className='block text-gray-300'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded'
        />
      </div>
      <div className='flex space-x-4'>
        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200'
        >
          Save Changes
        </button>
        <button
          type='button'
          onClick={() => navigate('/settings')}
          className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200'
        >
          Back
        </button>
      </div> 
    </form>
  );
};

export default EditProfileForm;