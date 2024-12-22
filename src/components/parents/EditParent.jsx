import React, { useState } from "react";
import { motion } from "framer-motion";

const EditParent = ({ parent, onClose, onSave }) => {
  const [editedParent, setEditedParent] = useState({ ...parent });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedParent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedParent);
  };

  return (
    <motion.div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='bg-gray-800 p-6 rounded-lg w-11/12 max-w-md'
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className='text-2xl font-semibold text-white mb-4'>Edit Parent</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-300'>Name</label>
            <input
              type='text'
              name='name'
              value={editedParent.name}
              onChange={handleChange}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>
          <div>
            <label className='block text-gray-300'>Phone Number</label>
            <input
              type='text'
              name='phone'
              value={editedParent.phoneNumber}
              onChange={handleChange}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>
          <div>
            <label className='block text-gray-300'>Address</label>
            <input
              type='text'
              name='address'
              value={editedParent.address}
              onChange={handleChange}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500'
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditParent;