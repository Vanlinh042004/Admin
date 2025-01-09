import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import io from "socket.io-client"; // Import socket.io-client

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messagesData, setMessagesData] = useState([]);
  const [socket, setSocket] = useState(null); // State to hold the socket connection
  const [messageContent, setMessageContent] = useState(""); // State for message input

  // const messagesData = [
  //   { id: 1, name: "Nguyễn Văn A", lastMessage: "Xin chào!", time: "10:30", messages: [{ from: "admin", text: "Chào bạn, tôi có thể giúp gì?", time: "10:31" }] },
  //   { id: 2, name: "Trần Thị B", lastMessage: "Cảm ơn!", time: "10:15", messages: [{ from: "user", text: "Tôi muốn hỏi về dịch vụ.", time: "10:14" }] },
  //   { id: 3, name: "Lê Hoàng C", lastMessage: "Tôi cần hỗ trợ!", time: "09:50", messages: [{ from: "user", text: "Làm thế nào để đăng ký?", time: "09:48" }] },
  // ];

  const content = "Hello";
  const receiverId = 111; // Replace with dynamic receiverId

  // Setup the socket connection on mount
  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Update with your backend URL
    setSocket(newSocket);

    // Listen for new messages
    newSocket.on("newMessage", (message) => {
      setMessagesData((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup socket on unmount
    return () => newSocket.close();
  }, []);

  // Send reply message to backend
  const handleReplyChat = async (content, receiverId) => {
    try {
      const response = await api.post("/messages/reply", {
        content,
        receiverId,
      });
      console.log("API Response:", response.data);
      if (socket) {
        // Emit the message to the WebSocket server for real-time updates
        socket.emit("sendMessage", {
          senderId: 1, // Replace with actual senderId (admin's ID)
          receiverId,
          content,
        });
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // Handle user selection from the list
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessagesData(user.messages);
  };

  // Handle message input change
  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (messageContent && selectedUser) {
      handleReplyChat(messageContent, selectedUser.id);
      setMessageContent(""); // Clear input after sending
    }
  };

  const getMessages = async () => {
    try {
      const response = await api.get("/messages");
      setMessagesData(response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div>
        <div className="flex h-screen bg-gray-100">
          {/* Left column: User list */}
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

          {/* Right column: Chat window */}
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

            {/* Input and send message */}
            {selectedUser && (
              <div className="p-4 border-t bg-gray-100">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={messageContent}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    onClick={handleSendMessage}
                  >
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
