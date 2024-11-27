// src/components/settings/ChangePasswordForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thay đổi mật khẩu, ví dụ gọi API để cập nhật mật khẩu
    // Sau khi thay đổi thành công, bạn có thể điều hướng lại trang settings hoặc hiển thị thông báo thành công
    // Ví dụ:
    // navigate('/settings');
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-gray-300'>Current Password</label>
        <input
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className='w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded'
          required
        />
      </div>
      <div>
        <label className='block text-gray-300'>New Password</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded'
          required
        />
      </div>
      <div className='flex space-x-4'>
        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200'
        >
          Change Password
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

export default ChangePasswordForm;