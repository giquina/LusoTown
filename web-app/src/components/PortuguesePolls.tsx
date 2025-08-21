"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  PlayIcon,
  StopIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { BarChart3, Users, Clock, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PortuguesePoll, ChatUser } from "@/types/chat";
import { socketManager } from "@/lib/socket-client";

interface PortuguesePollsProps {
  currentUser: ChatUser | null;
  canCreatePolls: boolean;
  streamId: string;
  className?: string;
}

export default function PortuguesePolls({
  currentUser,
  canCreatePolls,
  streamId,
  className = "",
}: PortuguesePollsProps) {
  const { language } = useLanguage();
  const [activePolls, setActivePolls] = useState<PortuguesePoll[]>([]);
  const [completedPolls, setCompletedPolls] = useState<PortuguesePoll[]>([]);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
    duration: 60,
    allowMultiple: false,
  });

  // Portuguese cultural poll templates
  const POLL_TEMPLATES = [
    {
      question:
        language === "pt"
          ? "Qual o melhor prato português?"
          : "What's the best Portuguese dish?",
      options: ["Pastéis de Nata", "Bacalhau", "Francesinha", "Caldo Verde"],
    },
    {
      question:
        language === "pt"
          ? "Melhor música portuguesa?"
          : "Best Portuguese music?",
      options: ["Fado", "Pimba", "Rock Português", "Música Popular"],
    },
    {
      question:
        language === "pt"
          ? "Cidade portuguesa favorita?"
          : "Favorite Portuguese city?",
      options: ["Lisboa", "Porto", "Coimbra", "Aveiro"],
    },
    {
      question:
        language === "pt"
          ? "Melhor jogador português?"
          : "Best Portuguese player?",
      options: ["Cristiano Ronaldo", "Eusébio", "Luís Figo", "Rui Costa"],
    },
    {
      question:
        language === "pt" ? "Tradição favorita?" : "Favorite tradition?",
      options: ["Santos Populares", "Festa do Avante", "Romarias", "Vindimas"],
    },
  ];

  useEffect(() => {
    // Listen for poll updates from socket
    socketManager.onPollCreated((poll: PortuguesePoll) => {
      setActivePolls((prev) => [...prev, poll]);
    });

    socketManager.onPollUpdated((poll: PortuguesePoll) => {
      if (poll.isActive) {
        setActivePolls((prev) =>
          prev.map((p) => (p.id === poll.id ? poll : p))
        );
      } else {
        setActivePolls((prev) => prev.filter((p) => p.id !== poll.id));
        setCompletedPolls((prev) => [poll, ...prev.slice(0, 9)]); // Keep last 10 completed polls
      }
    });

    return () => {
      socketManager.removeAllListeners();
    };
  }, []);

  const handleCreatePoll = () => {
    if (!newPoll.question.trim() || newPoll.options.length < 2) return;

    const poll: Omit<PortuguesePoll, "id" | "timestamp"> = {
      question: newPoll.question,
      options: newPoll.options
        .filter((option) => option.trim())
        .map((text, index) => ({
          id: `option_${index}`,
          text: text.trim(),
          votes: 0,
          voters: [],
        })),
      createdBy: currentUser?.id || "",
      duration: newPoll.duration,
      isActive: true,
      allowMultiple: newPoll.allowMultiple,
    };

    socketManager.createPoll(poll);

    // Reset form
    setNewPoll({
      question: "",
      options: ["", ""],
      duration: 60,
      allowMultiple: false,
    });
    setShowCreatePoll(false);
  };

  const handleVote = (pollId: string, optionId: string) => {
    if (!currentUser) return;
    socketManager.votePoll(pollId, optionId);
  };

  const addPollOption = () => {
    if (newPoll.options.length < 6) {
      setNewPoll((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const removePollOption = (index: number) => {
    if (newPoll.options.length > 2) {
      setNewPoll((prev) => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    setNewPoll((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option)),
    }));
  };

  const applyTemplate = (template: any) => {
    setNewPoll((prev) => ({
      ...prev,
      question: template.question,
      options: [...template.options],
    }));
  };

  const getTotalVotes = (poll: PortuguesePoll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  };

  const hasUserVoted = (poll: PortuguesePoll) => {
    if (!currentUser) return false;
    return poll.options.some((option) =>
      option.voters.includes(currentUser.id)
    );
  };

  const getUserVote = (poll: PortuguesePoll) => {
    if (!currentUser) return null;
    return poll.options.find((option) =>
      option.voters.includes(currentUser.id)
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Create Poll Button */}
      {canCreatePolls && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-primary-600" />
            {language === "pt" ? "Sondagens Portuguesas" : "Portuguese Polls"}
          </h3>

          <button
            onClick={() => setShowCreatePoll(true)}
            className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg 
              hover:bg-primary-700 transition-colors text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            {language === "pt" ? "Nova Sondagem" : "New Poll"}
          </button>
        </div>
      )}

      {/* Active Polls */}
      {activePolls.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-secondary-700 flex items-center gap-2">
            <PlayIcon className="w-4 h-4 text-action-600" />
            {language === "pt" ? "Sondagens Ativas" : "Active Polls"} (
            {activePolls.length})
          </h4>

          {activePolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              currentUser={currentUser}
              onVote={handleVote}
              language={language}
              isActive={true}
            />
          ))}
        </div>
      )}

      {/* Completed Polls */}
      {completedPolls.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-secondary-700 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            {language === "pt" ? "Sondagens Anteriores" : "Previous Polls"}
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {completedPolls.slice(0, 3).map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                currentUser={currentUser}
                onVote={handleVote}
                language={language}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Polls Message */}
      {activePolls.length === 0 && completedPolls.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">
            {language === "pt"
              ? "Nenhuma sondagem ainda. Que tal criar uma?"
              : "No polls yet. Why not create one?"}
          </p>
        </div>
      )}

      {/* Create Poll Modal */}
      <AnimatePresence>
        {showCreatePoll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setShowCreatePoll(false)
            }
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === "pt" ? "Criar Sondagem" : "Create Poll"}
                  </h3>
                  <button
                    onClick={() => setShowCreatePoll(false)}
                    className="text-gray-400 hover:text-secondary-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Poll Templates */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-secondary-700 mb-2">
                    {language === "pt"
                      ? "Modelos Culturais"
                      : "Cultural Templates"}
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {POLL_TEMPLATES.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => applyTemplate(template)}
                        className="flex-shrink-0 px-3 py-2 bg-primary-50 text-primary-700 
                          rounded-full text-xs hover:bg-primary-100 transition-colors"
                      >
                        {template.question.split("?")[0]}?
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === "pt" ? "Pergunta" : "Question"}
                  </label>
                  <input
                    type="text"
                    value={newPoll.question}
                    onChange={(e) =>
                      setNewPoll((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    placeholder={
                      language === "pt"
                        ? "Qual é a sua pergunta?"
                        : "What's your question?"
                    }
                    className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm 
                      focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Options */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === "pt" ? "Opções" : "Options"}
                  </label>
                  <div className="space-y-2">
                    {newPoll.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updatePollOption(index, e.target.value)
                          }
                          placeholder={`${
                            language === "pt" ? "Opção" : "Option"
                          } ${index + 1}`}
                          className="flex-1 border border-secondary-300 rounded-lg px-3 py-2 text-sm 
                            focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {newPoll.options.length > 2 && (
                          <button
                            onClick={() => removePollOption(index)}
                            className="p-2 text-coral-500 hover:text-red-700"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    {newPoll.options.length < 6 && (
                      <button
                        onClick={addPollOption}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-secondary-600 
                          hover:text-secondary-800 border-2 border-dashed border-secondary-300 rounded-lg 
                          hover:border-gray-400 transition-colors w-full"
                      >
                        <PlusIcon className="w-4 h-4" />
                        {language === "pt" ? "Adicionar opção" : "Add option"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Settings */}
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      {language === "pt"
                        ? "Duração (segundos)"
                        : "Duration (seconds)"}
                    </label>
                    <select
                      value={newPoll.duration}
                      onChange={(e) =>
                        setNewPoll((prev) => ({
                          ...prev,
                          duration: parseInt(e.target.value),
                        }))
                      }
                      className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value={30}>
                        30 {language === "pt" ? "segundos" : "seconds"}
                      </option>
                      <option value={60}>
                        1 {language === "pt" ? "minuto" : "minute"}
                      </option>
                      <option value={120}>
                        2 {language === "pt" ? "minutos" : "minutes"}
                      </option>
                      <option value={300}>
                        5 {language === "pt" ? "minutos" : "minutes"}
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowMultiple"
                      checked={newPoll.allowMultiple}
                      onChange={(e) =>
                        setNewPoll((prev) => ({
                          ...prev,
                          allowMultiple: e.target.checked,
                        }))
                      }
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="allowMultiple"
                      className="ml-2 text-sm text-secondary-700"
                    >
                      {language === "pt"
                        ? "Permitir múltiplas escolhas"
                        : "Allow multiple choices"}
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreatePoll(false)}
                    className="flex-1 px-4 py-2 text-secondary-700 bg-secondary-100 rounded-lg 
                      hover:bg-secondary-200 transition-colors"
                  >
                    {language === "pt" ? "Cancelar" : "Cancel"}
                  </button>
                  <button
                    onClick={handleCreatePoll}
                    disabled={
                      !newPoll.question.trim() ||
                      newPoll.options.filter((o) => o.trim()).length < 2
                    }
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg 
                      hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-colors"
                  >
                    {language === "pt" ? "Criar Sondagem" : "Create Poll"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Poll Card Component
function PollCard({
  poll,
  currentUser,
  onVote,
  language,
  isActive,
}: {
  poll: PortuguesePoll;
  currentUser: ChatUser | null;
  onVote: (pollId: string, optionId: string) => void;
  language: "en" | "pt";
  isActive: boolean;
}) {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );
  const hasVoted = currentUser
    ? poll.options.some((option) => option.voters.includes(currentUser.id))
    : false;
  const userVote = currentUser
    ? poll.options.find((option) => option.voters.includes(currentUser.id))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 ${
        isActive
          ? "border-primary-200 bg-primary-50"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm">{poll.question}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users className="w-3 h-3" />
          <span>{totalVotes}</span>
        </div>
      </div>

      <div className="space-y-2">
        {poll.options.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = userVote?.id === option.id;

          return (
            <button
              key={option.id}
              onClick={() =>
                isActive &&
                currentUser &&
                !hasVoted &&
                onVote(poll.id, option.id)
              }
              disabled={!isActive || !currentUser || hasVoted}
              className={`w-full text-left p-3 rounded-lg border transition-all relative overflow-hidden ${
                isSelected
                  ? "border-primary-300 bg-primary-100 text-primary-800"
                  : hasVoted || !isActive
                  ? "border-gray-200 bg-secondary-100 cursor-default"
                  : "border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              {/* Progress Bar */}
              {totalVotes > 0 && (
                <div
                  className={`absolute inset-0 ${
                    isSelected ? "bg-primary-200" : "bg-secondary-200"
                  } transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                <div className="flex items-center gap-2 text-xs">
                  {isSelected && <CheckCircleIcon className="w-4 h-4" />}
                  <span>{option.votes}</span>
                  {totalVotes > 0 && (
                    <span className="text-gray-500">
                      ({Math.round(percentage)}%)
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isActive && currentUser && !hasVoted && (
        <p className="text-xs text-secondary-600 mt-2">
          {language === "pt" ? "Clique para votar" : "Click to vote"}
        </p>
      )}

      {hasVoted && (
        <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
          <CheckCircleIcon className="w-3 h-3" />
          {language === "pt" ? "Obrigado pelo seu voto!" : "Thanks for voting!"}
        </p>
      )}
    </motion.div>
  );
}
