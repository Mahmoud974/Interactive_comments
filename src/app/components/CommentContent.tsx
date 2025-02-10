import React from "react";

const CommentContent = ({ comment }: { comment: string }) => {
  const formatCommentWithMentions = (comment: string) => {
    const mentionRegex = /(@\w+)/g;
    return comment.split(mentionRegex).map((part, index) =>
      mentionRegex.test(part) ? (
        <span key={index} className="text-purple-700 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <p className="text-gray-500 mt-2">{formatCommentWithMentions(comment)}</p>
  );
};
export default CommentContent;
