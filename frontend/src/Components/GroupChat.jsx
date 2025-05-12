import React, { useState, useRef } from "react";
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
  const [anotherPersonChatList, setAnotherPersonChatList] = useState([
    { message: "hello " },
    { message: "john this side", img: "metrics-report.pdf", imgSize: "2.5 MB" },
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

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

  return (
    <div className="bg-white w-full h-screen relative">
      {/* Navbar */}
      <nav className="w-full flex justify-between px-6 py-4 h-fit border-gray-100 border-b-4">
        <p className="text-xl md:text-3xl font-bold ">Group Chat</p>
        <div className="flex justify-center items-center space-x-2 text-xs md:text-sm">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <p>4 online</p>
        </div>
      </nav>

      {/* ten logo Background SVG */}
      <div className="h-4/5 w-full px-8 py-7 pb-0 absolute -z-3 flex justify-center items-center opacity-10"></div>

      {/* another person Chat Messages */}
      <div className="h-4/5 w-full pt-3 px-2 pb-4 md:px-8 md:pb-5 md:pt-3 lg:py-3 absolute -z-11 overflow-y-scroll">
        <div className="h-full overflow-y-scroll pr-2 space-y-4 ">
          {anotherPersonChatList.map((chat, idx) => (
            <div key={idx} className="flex space-x-2 md:space-x-4 mb-4">
              <img
                className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                src="https://thumbs.dreamstime.com/b/business-man-city-portrait-street-travel-commute-confident-job-insurance-agency-person-accountant-smile-suit-343304556.jpg"
                alt="User"
              />
              <div className="space-y-1 w-fit">
                <h1 className="font-semibold text-sm ">Alex Carry</h1>
                <div className="bg-white max-w-[80vw] md:max-w-md break-words h-fit md:px-4 md:py-3 px-3 py-2 shadow-lg rounded-xl rounded-tr-sm text-xs md:text-sm">
                  <p>{chat.message}</p>
                  {chat.img && (
                    <div className="p-2 border-2 rounded-md mt-2 gap-12 md:flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <CiFileOn className="w-5 h-5" />
                        <div className="w-fit space-y-1">
                          <p className="font-semibold">{chat.img}</p>
                          <p className="font-light">{chat.imgSize}</p>
                        </div>
                      </div>
                      <button className="p-2 bg-blue-600 text-white rounded-lg text-xs w-full md:w-fit">
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* user chats list */}
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className="flex space-x-2 md:space-x-4 mb-4 justify-end text-xs lg:text-sm"
            >
              <div className="space-y-1 w-fit p-1 rounded-md">
                <div className="flex justify-end">
                  <h1 className="font-semibold ">Alex Carry</h1>
                </div>
                <div className="bg-blue-100 max-w-[80vw] md:max-w-md break-words h-fit md:px-4 md:py-3 px-3 py-2 shadow-lg rounded-xl rounded-tr-sm text-xs md:text-sm">
                  <p className="">{chat.message}</p>
                  {chat.img && (
                    <div className="p-2 border-2 border-gray-400 rounded-md mt-2 gap-12 md:flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <CiFileOn className="w-5 h-5" />
                        <div className="w-fit space-y-1">
                          <p className="font-semibold">{chat.img}</p>
                          <p className="font-light">{chat.imgSize}</p>
                        </div>
                      </div>
                      <button className="p-2 bg-blue-600 text-white rounded-lg text-xs w-full md:w-fit">
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <img
                className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
                alt="User"
              />
            </div>
          ))}
        </div>
      </div>

      {/* show image div when image is slected before form submition */}
      <div className="flex h-fit w-full items-center justify-center flex-col space-x-5 pr-2 md:pr-6 md:pl-2 py-4 absolute z-0 bottom-0 ">
        {selectedFile && (
          <div className="w-11/12 h-fit bg-gray-200 mb-1 rounded-lg p-4 flex border-2 border-gray-600">
            <div className="flex justify-between mb-1 w-full">
              <div className="font-semibold text-xs md:text-sm">
                <p>{selectedFile.name}</p>
                <p className="font-light text-xs mt-1">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <RxCross2
                onClick={() => setSelectedFile(null)}
                className="cursor-pointer w-4 h-4 font-bold"
              />
            </div>
          </div>
        )}

        {/* Chat Input */}
        <form
          onSubmit={handleChat}
          className="flex w-full space-x-2 md:space-x-4"
        >
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div
            onClick={handleFileInputClick}
            className="md:p-3 p-2 h-fit w-fit rounded-full bg-gray-100 hover:cursor-pointer"
          >
            <MdOutlineAddPhotoAlternate className="w-5 h-5 md:w-6 md:h-6 " />
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-3 md:py-2 bg-gray-100 rounded-lg outline-none focus:border-blue-600 border-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 duration-200 rounded-lg text-xs md:text-sm px-2 md:px-4 py-2 text-white "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupChat;
