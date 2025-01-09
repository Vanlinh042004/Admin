import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Dữ liệu giả
  const messagesData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      lastMessage: "Xin chào!",
      time: "10:30",
      messages: [
        { from: "admin", text: "Chào bạn, tôi có thể giúp gì?", time: "10:31" },
      ],
    },
    {
      id: 2,
      name: "Trần Thị B",
      lastMessage: "Cảm ơn!",
      time: "10:15",
      messages: [
        { from: "user", text: "Tôi muốn hỏi về dịch vụ.", time: "10:14" },
      ],
    },
    {
      id: 3,
      name: "Lê Hoàng C",
      lastMessage: "Tôi cần hỗ trợ!",
      time: "09:50",
      messages: [
        { from: "user", text: "Làm thế nào để đăng ký?", time: "09:48" },
      ],
    },
  ];

  // Hàm chọn người dùng
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div>
        <div className="flex h-screen bg-gray-100">
          {/* Cột bên trái: Danh sách người nhắn tin */}
          <div className="w-1/3 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b bg-gray-100">
              <h2 className="text-xl font-semibold text-gray-700">
                Danh sách tin nhắn
              </h2>
            </div>
            {messagesData.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center justify-between p-4 border-b cursor-pointer ${
                  selectedUser?.id === user.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-200"
                }`}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
            ))}
          </div>

          {/* Cột bên phải: Khung chat */}
          <div className="w-2/3 flex flex-col bg-white">
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedUser
                  ? selectedUser.name
                  : "Chọn người dùng để bắt đầu"}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedUser ? (
                selectedUser.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.from === "admin" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        msg.from === "admin"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  Không có tin nhắn nào.
                </p>
              )}
            </div>
            {selectedUser && (
              <div className="p-4 border-t bg-gray-100">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                    Gửi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
