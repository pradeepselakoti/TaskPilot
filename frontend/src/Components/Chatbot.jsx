import { useState } from "react";
import axios from "axios";
import { FiMaximize2, FiMinimize2, FiX, FiTrash2 } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "MyPersonalChatBot",
          },
        }
      );
      const reply = res.data.choices[0].message.content;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || err.message;
      setErrorMessage(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setErrorMessage("");
  };

  const handleStartChat = () => {
    setShowWelcome(false);
  };

  return (
    <div
      className={`z-50 ${
        fullscreen ? "fixed inset-0" : "fixed bottom-4 right-4 sm:right-6"
      } transition-all duration-300`}
    >
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-full shadow-lg transition hover:scale-105"
        >
          <BsRobot className="text-xl" />
        </button>
      )}

      {open && (
        <div
          className={`${
            fullscreen
              ? "w-full h-full"
              : "w-[95vw] max-w-sm h-[80vh] sm:h-[32rem]"
          } backdrop-blur-md bg-white/90 border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all`}
        >
          {/* Header (only for chat view) */}
          {!showWelcome && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 flex justify-between items-center font-semibold text-sm rounded-t-2xl shadow-lg">
              <span className="flex items-center gap-2">
                <BsRobot className="text-lg" /> AI Assistant
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  title="Clear Chat"
                  className="text-white hover:text-red-500 transition-all"
                >
                  <FiTrash2 className="text-xl" />
                </button>
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  title={fullscreen ? "Minimize" : "Fullscreen"}
                  className="hover:text-yellow-200 transition-all"
                >
                  {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
                </button>
                <button
                  onClick={() => {
                    setFullscreen(false);
                    setOpen(false);
                  }}
                  title="Close"
                  className="hover:text-red-200 transition-all"
                >
                  <FiX />
                </button>
              </div>
            </div>
          )}

          {/* Welcome Screen */}
          {showWelcome ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-white via-blue-50 to-white rounded-t-2xl p-8 animate-bounceIn">
              <div className="flex items-center justify-center mb-4">
                <BsRobot className="text-6xl text-blue-600 animate-bounce" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-3">
                Welcome to Your AI Assistant!
              </h2>
              <p className="text-lg text-gray-600 opacity-80 mb-6">
                I'm here to assist you with your tasks and questions in a smart
                way.
              </p>
              <button
                onClick={handleStartChat}
                className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-b-2xl relative">
                {messages.length === 0 && !loading && !errorMessage && (
                  <div className="flex justify-center items-center h-full opacity-40">
                    <BsRobot className="text-[5rem] text-blue-600" />
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-xl shadow-md text-sm ${
                        msg.role === "user"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-center items-center opacity-50">
                    <BsRobot className="text-[3rem] text-blue-600" />
                  </div>
                )}

                {errorMessage && (
                  <div className="text-red-500 text-center mt-4">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex border-t border-gray-300 bg-white rounded-b-2xl  shadow-lg sha">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask your assistant..."
                  className="flex-1 p-4 text-sm outline-none  bg-blue-50 placeholder-gray-500 "
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center justify-center"
                >
                  <IoMdSend className="text-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
