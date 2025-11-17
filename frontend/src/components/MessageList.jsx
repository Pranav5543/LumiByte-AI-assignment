import { useEffect, useRef } from "react";
import { AnswerCard } from "./AnswerCard.jsx";

export function MessageList({ messages, sessionId, onFeedback }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl mx-auto w-full">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          } animate-fade-in`}
        >
          <div
            className={`max-w-2xl sm:max-w-3xl ${
              message.type === "user"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-md shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-md shadow-lg border border-gray-200 dark:border-gray-700"
            } p-4 sm:p-6 transform transition-all duration-200 hover:shadow-xl`}
          >
            {message.type === "user" ? (
              <p className="text-sm">{message.question}</p>
            ) : (
              <div className="space-y-3">
                <AnswerCard answer={message.answer} />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => onFeedback(index, "like")}
                    className={`p-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                      message.feedback === "like"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-500 hover:text-blue-500 dark:text-gray-400"
                    }`}
                    title="Like this response"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        message.feedback === "like"
                          ? "fill-current"
                          : "fill-none stroke-current"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 10h4.764a2 2 0 0 1 1.789 2.894l-3.646 7.692A2 2 0 0 1 15.118 23H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4.555c.375-1.318 1.316-3.591 2.368-5.953.259-.592.654-.9 1.077-.9 1.614 0 2 1.2 2 2.5s-.5 2.5-1 4z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onFeedback(index, "dislike")}
                    className={`p-3 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                      message.feedback === "dislike"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-500 hover:text-red-500 dark:text-gray-400"
                    }`}
                    title="Dislike this response"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        message.feedback === "dislike"
                          ? "fill-current"
                          : "fill-none stroke-current"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 14H5.236a2 2 0 0 1-1.789-2.894l3.646-7.692A2 2 0 0 1 8.882 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4.555c-.375 1.318-1.316 3.591-2.368 5.953-.259.592-.654.9-1.077.9-1.614 0-2-1.2-2-2.5s.5-2.5 1-4z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
