import { IoArrowUndoSharp, IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface ReplyButtonProps {
  onClick: () => void;
  pseudo: string;
  isCurrentUser: boolean;
  commentId: string;
  handleDeleteComment: (commentId: string) => void;
}

const ReplyButton = ({
  onClick,
  pseudo,
  isCurrentUser,
  commentId,
  handleDeleteComment,
}: ReplyButtonProps) => {
  return isCurrentUser ? (
    <div className="flex gap-3">
      <button
        className="flex items-center cursor-pointer"
        aria-label={`Supprimer le commentaire de ${pseudo}`}
        onClick={() => handleDeleteComment(commentId)}
      >
        <MdDelete className="text-red-500 font-bold" />
        <span className="ml-1 text-sm md:text-md font-bold text-red-500">
          Delete
        </span>
      </button>

      <button
        className="flex items-center cursor-pointer"
        aria-label={`Modifier le commentaire de ${pseudo}`}
        onClick={() => alert("Modifier")}
      >
        <IoPencil className="text-purple-700 font-bold" />
        <span className="ml-1 text-sm md:text-md font-bold text-purple-700">
          Edit
        </span>
      </button>
    </div>
  ) : (
    <button
      className="flex items-center cursor-pointer"
      onClick={onClick}
      aria-label={`Répondre à ${pseudo}`}
    >
      <IoArrowUndoSharp className="text-purple-700 font-bold" />
      <span className="ml-1 text-sm md:text-md font-bold text-purple-700">
        Reply
      </span>
    </button>
  );
};

export default ReplyButton;
