import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, addUserMessage } from "../features/Ai/aiSlice";
import {
  FaMinus,
  FaPaperPlane,
  FaRobot,
  FaMagic,
  FaUser,
} from "react-icons/fa";

const AIChatBox = () => {
  const [message, setMessage] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.ai);
  const listRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    dispatch(addUserMessage(message));
    dispatch(sendMessage(message));

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // COLLAPSED / FLOATING ACTION BUTTON STATE
  if (collapsed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in zoom-in duration-200">
        <button
          onClick={() => setCollapsed(false)}
          className="bg-[#2874f0] hover:bg-[#1a5fcc] text-white p-4 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95 group relative border border-white/20 cursor-pointer"
          title="Open Shopping Assistant"
          type="button"
        >
          <FaRobot className="text-xl sm:text-2xl animate-bounce" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold tracking-wide whitespace-nowrap inline-block">
            Ask Assistant
          </span>
          {/* Subtle Notification Pulse */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#fb641b] rounded-full border-2 border-white animate-ping" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#fb641b] rounded-full border-2 border-white" />
        </button>
      </div>
    );
  }

  // ACTIVE EXPANDED CONSOLE LAYOUT
  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] h-[100dvh] sm:h-[480px] bg-white sm:rounded-xl shadow-2xl border border-slate-200/80 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
      {/* BRAND HEADER SEGMENT */}
      <div className="bg-[#2874f0] p-3.5 flex items-center justify-between text-white shrink-0 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300 shadow-inner relative border border-white/10">
            <FaMagic className="text-xs animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wide flex items-center gap-1.5 leading-none">
              Shopping Assistant{" "}
              <span className="text-[9px] bg-amber-400 text-[#2874f0] px-1 rounded-sm uppercase font-extrabold tracking-normal">
                Beta
              </span>
            </h2>
            <p className="text-[10px] text-blue-100 font-medium mt-0.5">
              Powered by AI • Online
            </p>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
          title="Minimize Chat"
          type="button"
        >
          <FaMinus className="text-xs" />
        </button>
      </div>

      {/* CHAT BUBBLE STREAM WINDOW */}
      <div
        ref={listRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 scroll-smooth"
      >
        {/* DEFAULT WELCOME BANNER DISPLAY */}
        {(!messages || messages.length === 0) && (
          <div className="bg-white border border-slate-200/60 rounded-lg p-3.5 shadow-sm text-center space-y-2 mt-2">
            <div className="w-9 h-9 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
              <FaRobot className="text-base" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800">
                Hello! I'm your retail guide.
              </p>
              <p className="text-[11px] text-slate-400 font-medium px-2">
                Ask me to compare specifications, find user reviews, check
                orders, or discover trending tech accessories!
              </p>
            </div>
          </div>
        )}

        {/* MESSAGES MAPPING GENERATOR */}
        {messages &&
          messages.map((msg, index) => {
            const isUser = msg && msg.role === "user";
            return (
              <div
                key={index}
                className={`flex items-end gap-2 animate-in fade-in slide-in-from-bottom-1 duration-150 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar on Assistant messages */}
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] shrink-0 border border-slate-300/40 font-bold">
                    <FaRobot />
                  </div>
                )}

                <div
                  className={`max-w-[78%] p-3 text-xs shadow-sm font-medium leading-relaxed tracking-normal
                  ${
                    isUser
                      ? "bg-[#2874f0] text-white rounded-2xl rounded-br-sm"
                      : "bg-white text-slate-800 rounded-2xl rounded-bl-sm border border-slate-200/80"
                  }`}
                >
                  {msg && msg.content}
                </div>

                {/* Avatar on User messages */}
                {isUser && (
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center text-[10px] shrink-0 border border-blue-100 font-bold">
                    <FaUser />
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* INPUT INTERACTION CONTROL INTERFACE */}
      <div className="p-3 bg-white border-t border-slate-200/80 shrink-0 pb-safe">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md p-1 focus-within:border-[#2874f0] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#2874f0]/20 transition-all">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about items, features, specifications..."
            className="flex-1 px-2.5 py-2 text-xs bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-[#fb641b] hover:bg-[#e15613] disabled:opacity-30 disabled:hover:bg-[#fb641b] text-white p-2 rounded-sm transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-sm shrink-0"
            type="button"
          >
            <FaPaperPlane className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AIChatBox);
