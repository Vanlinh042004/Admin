import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng đang được chọn
  const [chatRooms, setChatRooms] = useState([]); // Danh sách phòng chat
  const [socket, setSocket] = useState(null); // Kết nối socket
  const [messageContent, setMessageContent] = useState(""); // Nội dung tin nhắn

  const adminId = 109; // ID của admin

  // Thiết lập kết nối socket khi component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Lấy token từ sessionStorage
    if (!token) {
      console.error("No token found in sessionStorage");
    }
    const newSocket = io("https://tutorprosite-k22-1.onrender.com", {
      auth: { token },
      transports: ["websocket"], // Ưu tiên WebSocket
    });
    // const newSocket = io("http://localhost:5000", {
    //   auth: { token },
    //   transports: ["websocket"], // Ưu tiên WebSocket
    // });
    setSocket(newSocket);

    // Lắng nghe sự kiện tải danh sách tin nhắn
    newSocket.on("recent-messages", (recentMessages) => {
      if (Array.isArray(recentMessages)) {
        const filteredMessages = filterMessagesForAdmin(
          recentMessages,
          adminId
        );
        const groupedChatRooms = groupMessagesByChatRoom(
          filteredMessages,
          adminId
        );
        setChatRooms(groupedChatRooms);
      } else {
        console.error("Invalid message data:", recentMessages);
      }
    });

    // Lắng nghe sự kiện tin nhắn mới
    newSocket.on("chat message", (newMessage) => {
      if (!newMessage) return;

      setChatRooms((prevChatRooms) => {
        const updatedChatRooms = { ...prevChatRooms };

        if (updatedChatRooms[newMessage.chatRoomId]) {
          updatedChatRooms[newMessage.chatRoomId].messages.push(newMessage);
          updatedChatRooms[newMessage.chatRoomId].lastMessage =
            newMessage.content;
          updatedChatRooms[newMessage.chatRoomId].timestamp =
            newMessage.timestamp;
        } else {
          const userId = getUserTitleFromChatRoomId(
            newMessage.chatRoomId,
            adminId
          );
          updatedChatRooms[newMessage.chatRoomId] = {
            chatRoomId: newMessage.chatRoomId,
            receiverId: userId,
            title: `User ${userId}`,
            lastMessage: newMessage.content,
            timestamp: newMessage.timestamp,
            messages: [newMessage],
          };
        }

        return updatedChatRooms;
      });

      // Cập nhật selectedUser nếu đang chat trong cùng phòng
      if (selectedUser?.chatRoomId === newMessage.chatRoomId) {
        setSelectedUser((prevUser) => ({
          ...prevUser,
          messages: [...prevUser.messages, newMessage],
        }));
      }
    });

    return () => newSocket.close();
  }, [selectedUser]);

  // Lấy danh sách tin nhắn ban đầu
  useEffect(() => {
    if (socket) {
      socket.emit("recent-messages");
    }
  }, [socket]);

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (messageContent && selectedUser) {
      const messageData = {
        receiverId: selectedUser.receiverId, // Gửi tin nhắn đến user được chọn
        content: messageContent,
      };

      socket.emit("chat message", messageData);

      const newMessage = {
        senderId: adminId,
        content: messageContent,
        timestamp: new Date().toISOString(),
        chatRoomId: selectedUser.chatRoomId,
      };

      // Cập nhật tin nhắn trong selectedUser
      setSelectedUser((prevUser) => ({
        ...prevUser,
        messages: [...prevUser.messages, newMessage],
      }));

      // Cập nhật tin nhắn trong chatRooms
      setChatRooms((prevChatRooms) => {
        const updatedChatRooms = { ...prevChatRooms };
        if (updatedChatRooms[selectedUser.chatRoomId]) {
          updatedChatRooms[selectedUser.chatRoomId].messages.push(newMessage);
          updatedChatRooms[selectedUser.chatRoomId].lastMessage =
            messageContent;
          updatedChatRooms[selectedUser.chatRoomId].timestamp =
            new Date().toISOString();
        }
        return updatedChatRooms;
      });

      setMessageContent("");
    }
  };

  // Xử lý khi admin chọn người dùng
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Lọc tin nhắn liên quan đến admin
  const filterMessagesForAdmin = (messages, adminId) => {
    return messages.filter(
      (message) =>
        message.senderId === adminId || message.receiverId === adminId
    );
  };

  // Lấy đúng ID người dùng từ chatRoomId
  const getUserTitleFromChatRoomId = (chatRoomId, adminId) => {
    const [id1, id2] = chatRoomId.split("-");
    return id1 === String(adminId) ? id2 : id1;
  };

  // Nhóm tin nhắn theo chatRoomId
  const groupMessagesByChatRoom = (messages, adminId) => {
    return messages.reduce((acc, message) => {
      if (!acc[message.chatRoomId]) {
        const userId = getUserTitleFromChatRoomId(message.chatRoomId, adminId);
        acc[message.chatRoomId] = {
          chatRoomId: message.chatRoomId,
          receiverId: userId,
          title: `User ${userId}`,
          lastMessage: message.content,
          timestamp: message.timestamp,
          messages: [],
        };
      }
      acc[message.chatRoomId].messages.push(message);
      return acc;
    }, {});
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div>
        <div className="flex h-screen bg-gray-100">
          {/* Cột bên trái: Danh sách phòng chat */}
          <div className="w-1/3 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b bg-gray-100">
              <h2 className="text-xl font-semibold text-gray-700">
                Danh sách phòng chat
              </h2>
            </div>
            {Object.values(chatRooms).map((room) => (
              <div
                key={room.chatRoomId}
                onClick={() => handleUserClick(room)}
                className={`flex items-center justify-between p-4 border-b cursor-pointer ${
                  selectedUser?.chatRoomId === room.chatRoomId
                    ? "bg-blue-100"
                    : "hover:bg-gray-200"
                }`}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {room.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {room.lastMessage || "Chưa có tin nhắn"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(room.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* Cột bên phải: Cửa sổ chat */}
          <div className="w-2/3 flex flex-col bg-white">
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedUser
                  ? selectedUser.title
                  : "Chọn phòng chat để bắt đầu"}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedUser ? (
                selectedUser.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.senderId === adminId ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        msg.senderId === adminId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  Không có tin nhắn nào.
                </p>
              )}
            </div>

            {/* Gửi tin nhắn */}
            {selectedUser && (
              <div className="p-4 border-t bg-gray-100">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
