import React, { useState, useRef, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

function GroupChat() {
  const [chatList, setChatList] = useState([
    {
      id: Date.now(),
      message: "hello , Alex this side",
      img: "image",
      imgSize: "2.5 MB",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  const anotherPersonChatList = [
    { message: "hello " },
    {
      message: "john this side",
      img: "metrics-report.pdf",
      imgSize: "2.5 MB",
    },
  ];

  function handleChat(e) {
    e.preventDefault();
    const newChat = { id: Date.now(), message: inputText };

    if (selectedFile) {
      newChat.img = selectedFile.name;
      newChat.imgSize = `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`;
    }

    setChatList([...chatList, newChat]);
    setInputText("");
    setSelectedFile(null);
  }

  function handleFileInputClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  return (
    <div className="bg-white w-full h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <p className="text-xl md:text-3xl font-bold">Group Chat</p>
        <div className="flex items-center space-x-2 text-sm">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          <p>4 online</p>
        </div>
      </nav>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-4">
        {anotherPersonChatList.map((chat, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            <img
              src="https://thumbs.dreamstime.com/b/business-man-city-portrait-street-travel-commute-confident-job-insurance-agency-person-accountant-smile-suit-343304556.jpg"
              alt="User"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
            />
            <div className="space-y-1 max-w-[80%]">
              <p className="font-semibold text-sm">Alex Carry</p>
              <div className="bg-gray-100 p-3 rounded-lg shadow text-sm">
                <p>{chat.message}</p>
                {chat.img && (
                  <div className="mt-2 p-2 border rounded-md text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CiFileOn className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">{chat.img}</p>
                        <p className="text-gray-500">{chat.imgSize}</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {chatList.map((chat) => (
          <div
            key={chat.id}
            className="flex items-end justify-end space-x-3 text-right"
          >
            <div className="space-y-1 max-w-[80%]">
              <p className="font-semibold text-sm">Alex Carry</p>
              <div className="bg-blue-100 p-3 rounded-lg shadow text-sm">
                <p>{chat.message}</p>
                {chat.img && (
                  <div className="mt-2 p-2 border rounded-md text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CiFileOn className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">{chat.img}</p>
                        <p className="text-gray-500">{chat.imgSize}</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
            <img
              src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
              alt="User"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
            />
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="px-3 md:px-6 pb-1">
          <div className="flex justify-between items-center bg-gray-200 rounded-md p-3 text-sm">
            <div>
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <RxCross2
              onClick={() => setSelectedFile(null)}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        </div>
      )}

      {/* Input Section */}
      <form
        onSubmit={handleChat}
        className="flex items-center px-3 md:px-6 py-3 gap-2 border-t border-gray-200"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleFileInputClick}
          className="bg-gray-100 p-2 rounded-full"
        >
          <MdOutlineAddPhotoAlternate className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border-2 border-gray-200 focus:border-blue-500 outline-none rounded-md px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default GroupChat;
