import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Eye, Trash, Menu } from "lucide-react";

const SparkHub = () => {
  const [ideas, setIdeas] = useState(() => {
    return JSON.parse(localStorage.getItem("sparkIdeas")) || [];
  });
  const [input, setInput] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sparkIdeas", JSON.stringify(ideas));
  }, [ideas]);

  const handleAddIdea = () => {
    if (!input.trim()) return;
    const newIdea = {
      id: Date.now(),
      text: input.trim(),
      response: null,
    };
    setIdeas((prev) => [newIdea, ...prev]);
    setInput("");
  };

  const handleAIResponse = async (id) => {
    const idea = ideas.find((i) => i.id === id);
    if (!idea || idea.response || loadingId) return;
    setLoadingId(id);
    try {
      const res = await axios.post("http://localhost:5000/api/sparkhub", {
        idea: idea.text,
      });
      const aiReply = res.data.response || res.data.reply || "No response";
      const updatedIdeas = ideas.map((i) =>
        i.id === id ? { ...i, response: aiReply } : i
      );
      setIdeas(updatedIdeas);
      setModalContent(aiReply);
      setModalTitle(idea.text);
      setSidebarOpen(true);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = (id) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  const pendingIdeas = ideas.filter((idea) => !idea.response);
  const answeredIdeas = ideas.filter((idea) => idea.response);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col md:flex-row overflow-hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden absolute top-4 left-4 z-30 p-2 bg-orange-600 rounded text-white"
      >
        <Menu />
      </button>

      <main className="flex-1 p-6 md:p-10 flex flex-col">
        <h1 className="text-4xl font-bold text-orange-400 mb-4">⚡ SparkHub</h1>
        <p className="text-gray-400 mb-6 max-w-xl">
          Drop your ideas, get instant AI insights, and track your creativity.
        </p>

        <div className="flex items-center gap-4 mb-8 max-w-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's your idea?"
            className="flex-1 p-3 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddIdea();
            }}
          />
          <button
            onClick={handleAddIdea}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 transition rounded-r text-white font-semibold"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
          {pendingIdeas.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No pending ideas. Add something!
            </p>
          ) : (
            pendingIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-orange-500 rounded-lg p-5 shadow-lg flex flex-col"
              >
                <p className="text-white font-semibold break-words mb-4">
                  {idea.text}
                </p>
                <button
                  onClick={() => handleAIResponse(idea.id)}
                  disabled={loadingId === idea.id}
                  className="bg-orange-900 hover:bg-orange-800 px-4 py-2 rounded text-white font-semibold transition disabled:opacity-50"
                >
                  {loadingId === idea.id ? "Thinking..." : "Get Insight"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-700 shadow-xl z-40 p-5 overflow-y-auto transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-300">📝 AI Insights</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X />
          </button>
        </div>

        {answeredIdeas.length === 0 ? (
          <p className="text-gray-500">No ideas processed yet.</p>
        ) : (
          <div className="space-y-5">
            {answeredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2 border border-gray-700"
              >
                <p className="text-orange-200 font-semibold break-words truncate">
                  {idea.text}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setModalContent(idea.response);
                      setModalTitle(idea.text);
                    }}
                    className="text-blue-400 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => handleDelete(idea.id)}
                    className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {modalContent && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
    onClick={() => setModalContent(null)}
  >
    <div
      className="bg-gray-900 border border-orange-500 p-6 rounded-lg max-w-lg w-full relative max-h-[80vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setModalContent(null)}
        className="absolute top-3 right-3 text-orange-400 hover:text-white"
      >
        <X size={20} />
      </button>
      <h3 className="text-lg font-bold text-orange-400 mb-3 pr-8">
        💡 {modalTitle}
      </h3>
      <div className="overflow-y-auto max-h-[60vh] pr-2">
        <p className="text-gray-300 whitespace-pre-wrap">{modalContent}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SparkHub;
