import React from "react";
import moment from "moment";
import 'moment/locale/fr';

function MessageItem({
  author,
  authorId,
  time,
  text,
  imageUrl,
  onDelete,
  onReply,
  onEdit,
  replyTo,
  isOwnMessage,
}) {
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || '?';
  const displayTime = moment(time).format("HH:mm");

  return (
    <div className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!isOwnMessage && (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold mr-2">
          {getInitial(author)}
        </div>
      )}

      <div
        className={`max-w-xs md:max-w-md p-3 rounded-lg shadow ${
          isOwnMessage
            ? "bg-green-600 text-white self-end"
            : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        }`}
      >
        <div className="text-sm font-semibold mb-1">
          {author}
        </div>

        {replyTo && (
          <div className="text-xs italic mb-1 opacity-70 border-l-2 pl-2 border-gray-400 dark:border-gray-500">
            Réponse à : {replyTo.text}
          </div>
        )}

        <div>{text}</div>

        <div className="text-xs mt-1 opacity-70 text-right">
          {displayTime}
        </div>

        {/* Actions si c’est le sien */}
        {isOwnMessage && (
          <div className="flex justify-end gap-2 mt-1 text-xs">
            <button onClick={onEdit} className="text-yellow-300 hover:text-yellow-500">✏️</button>
            <button onClick={onDelete} className="text-red-300 hover:text-red-500">🗑</button>
          </div>
        )}

        {/* Répondre */}
        {!isOwnMessage && (
          <div className="flex justify-start mt-1 text-xs">
            <button onClick={onReply} className="text-blue-400 hover:text-blue-600">↩️ Répondre</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
