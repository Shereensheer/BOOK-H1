import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  isLoading = false,
  isError = false
}) => {
  const bubbleClass = isUser
    ? 'bg-blue-500 text-white ml-auto'
    : isError
    ? 'bg-red-100 text-red-800 mr-auto'
    : 'bg-gray-200 text-gray-800 mr-auto';

  const alignmentClass = isUser ? 'items-end' : 'items-start';

  return (
    <div className={`flex ${alignmentClass} mb-3`}>
      <div className={`${bubbleClass} rounded-2xl px-4 py-2 max-w-[80%] break-words`}>
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-current rounded-full mr-1 animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;