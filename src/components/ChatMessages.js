// ✅ ChatMessages.js avec sticky headers et séparateurs animés + support réponse & édition
import React, { useState } from "react";
import MessageItem from "./MessageItem";
import { formatDateGroup } from "../utils/date";
import { motion } from "framer-motion";

function ChatMessages({ messages, currentUserId, onDelete, onReply, onEdit }) {
  const [replyTo, setReplyTo] = useState(null);

  // Grouper les messages par jour
  const groupedMessages = messages.reduce((acc, msg) => {
    const dateKey = formatDateGroup(msg.time);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  return (
    <div className="space-y-6 overflow-y-auto px-4 py-2">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date} className="relative">
          {/* Sticky Date Header */}
          <div className="sticky top-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-gray-500 dark:text-gray-300 font-semibold bg-white dark:bg-black py-1 rounded"
            >
              {date}
            </motion.div>
          </div>

          {/* Messages */}
          {msgs.map((msg) => (
            <MessageItem
              key={msg._id}
              id={msg._id}
                author={
                msg.author?.username !== msg.author?._id // Si l'auteur est bien peuplé
                    ? msg.author.username || `${msg.author.firstName} ${msg.author.lastName}`
                    : "Anonyme"
                }

              authorId={msg.author._id}
              time={msg.time}
              text={msg.text}
              imageUrl={msg.imageUrl}
              isOwnMessage={String(msg.author._id) === String(currentUserId)}
              onDelete={
                String(msg.author._id) === String(currentUserId)
                  ? () => onDelete(msg._id)
                  : null
              }
              onReply={() => setReplyTo(msg)}
              onEdit={
                String(msg.author._id) === String(currentUserId)
                  ? () => onEdit(msg)
                  : null
              }
              replyTo={msg.replyTo} // Pour affichage du message parent si besoin
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
