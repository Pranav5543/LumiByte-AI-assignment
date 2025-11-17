import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { Sidebar } from "../components/Sidebar";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";
import {
  getSessions,
  getSession,
  sendMessage,
  updateMessageFeedback,
  createNewChat,
  deleteChatHistory,
} from "../lib/apiService";

export default function ChatPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load sessions on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      }
    };
    loadSessions();
  }, []);

  // Load session messages when sessionId changes
  useEffect(() => {
    if (sessionId) {
      const loadSession = async () => {
        try {
          const session = await getSession(sessionId);
          setMessages(session.messages || []);
        } catch (error) {
          console.error("Failed to load session:", error);
          navigate("/");
        }
      };
      loadSession();
    }
  }, [sessionId, navigate]);

  const handleNewChat = async () => {
    try {
      setIsLoading(true);
      const { sessionId: newSessionId } = await createNewChat();
      const updatedSessions = await getSessions();
      setSessions(updatedSessions);
      navigate(`/chat/${newSessionId}`);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (question) => {
    if (!sessionId) return;
    try {
      setIsLoading(true);
      const updatedMessages = await sendMessage(sessionId, question);
      setMessages(updatedMessages);
      setSessions(await getSessions());
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageIndex, feedback) => {
    if (!sessionId) return;
    try {
      const updatedMessages = await updateMessageFeedback(
        sessionId,
        messageIndex,
        feedback
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Failed to update feedback:", error);
    }
  };

  const handleDeleteHistory = async () => {
    try {
      await deleteChatHistory();
      setSessions([]);
      setMessages([]);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete chat history:", error);
      alert(
        "Unable to delete chat history at this time. Please try again later."
      );
    }
  };

  if (!sessionId) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
            <svg
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
            Welcome to LumiByte AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Your intelligent AI-powered data assistant. Ask questions and get
            insights in beautiful, interactive table formats.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar
        sessions={sessions}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onDeleteHistory={handleDeleteHistory}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="text-center space-y-6 max-w-lg w-full">
              <div className="relative">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center mx-auto shadow-2xl">
                  <img
                    src="/logo.jpg"
                    alt="LumiByte AI Logo"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Start a conversation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed px-4">
                  Ask me anything about your data, metrics, or analytics. Get
                  intelligent insights in beautiful, interactive formats.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <MessageList
            messages={messages}
            sessionId={sessionId}
            onFeedback={handleFeedback}
          />
        )}

        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
