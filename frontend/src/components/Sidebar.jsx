import { useNavigate, useParams } from "react-router-dom";

export function Sidebar({
  sessions,
  onNewChat,
  isOpen,
  onClose,
  onDeleteHistory,
}) {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const handleSessionClick = (id) => {
    navigate(`/chat/${id}`);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 md:w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 flex flex-col shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="LumiByte AI Logo"
              className="h-8 w-8 rounded-lg object-cover shadow-lg"
            />
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              LumiByte AI
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-3 space-y-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-4 py-3 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-sm">New Chat</span>
          </button>

          <button
            onClick={onDeleteHistory}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl px-4 py-3 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-sm">Delete History</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {sessions.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No chat sessions yet
            </p>
          ) : (
            sessions.map((session) => (
              <button
                key={session.sessionId}
                onClick={() => handleSessionClick(session.sessionId)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 transform hover:scale-[1.02] ${
                  sessionId === session.sessionId
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:shadow-md"
                }`}
              >
                <div className="truncate font-medium">{session.title}</div>
                <div className="text-xs opacity-75 mt-1">
                  {new Date(session.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Guest User
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                user@insightbot.local
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
