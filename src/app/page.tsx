"use client";
import { useTemplate, usePostTemplate } from "../hooks/useTemplate";
import { useEffect, useState } from "react";
import CounterQuantity from "./components/CounterQuantity";
import { useForm, SubmitHandler } from "react-hook-form";
import { Profil } from "./modules/modules";
import { motion } from "framer-motion";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ProfileImage from "./components/ProfileImage";
import CommentContent from "./components/CommentContent";
import ReplyButton from "./components/ReplyButton";

export default function Page() {
  let newReply;
  const { data: getComments } = useTemplate();
  const { mutate: postComment } = usePostTemplate();
  const [respondIndex, setRespondIndex] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [editingCommentId, setEditingCommentId] = useState<any>(null);
  const [editCommentText, setEditCommentText] = useState<string>("");
  console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ comment: string }>();

  useEffect(() => {
    const savedUserData = localStorage.getItem("juliusomoData");
    if (savedUserData) {
      setData(JSON.parse(savedUserData));
    }
  }, []);

  const onSubmit: SubmitHandler<{ comment: string }> = (formData) => {
    newReply = {
      id: uuidv4(),
      parentId: parentId,
      img: "/assets/avatars/image-juliusomo.png",
      pseudo: "juliusomo",
      date: moment().fromNow(),
      quantity: 0,
      comment: formData.comment,
    };

    const updatedData = [...data, newReply];
    setData(updatedData);
    localStorage.setItem("juliusomoData", JSON.stringify(updatedData));

    postComment(newReply, {
      onSuccess: () => {
        setRespondIndex(null);
        setParentId(null);
        setReplyingTo("");
        setValue("comment", "");
      },
    });
  };

  const handleReplyClick = (
    index: number,
    commentId: number,
    pseudo: string
  ) => {
    setRespondIndex(index);
    setParentId(commentId);
    setReplyingTo(pseudo);
    setValue("comment", `@${pseudo} `);
  };

  const handleSaveEdit = (commentId: any) => {
    const updatedData = data.map((comment: any) =>
      comment.id === commentId
        ? { ...comment, comment: editCommentText }
        : comment
    );
    setData(updatedData);
    localStorage.setItem("juliusomoData", JSON.stringify(updatedData));
    setEditingCommentId(null);
    setEditCommentText("");
  };

  if (!getComments) {
    return <p>Loading...</p>;
  }

  return (
    <main
      className="flex items-center justify-center h-auto my-12 comment-list px-4 md:px-0"
      role="main"
    >
      <ul className="w-full max-w-3xl">
        {getComments?.map((item: Profil, index: number) => (
          <li key={item.id} className="mb-4" role="article">
            <motion.section
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`flex md:flex-row flex-col  items-start bg-white text-black rounded-xl shadow-lg p-4 ${
                respondIndex === index ? "border-l-4 border-purple-700" : ""
              }`}
              aria-expanded={respondIndex === index}
            >
              <CounterQuantity quantityUser={item.quantity} />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <ProfileImage
                    src={item.img || "/assets/avatars/image-amyrobson.webp"}
                    alt={`Photo de profil de ${item.pseudo}`}
                  />
                  <div className="flex flex-grow justify-between items-start">
                    <div className="flex flex-col md:flex-row">
                      <p className="flex-grow font-bold ml-2">
                        {item.pseudo}
                        {item.pseudo === "juliusomo" && (
                          <span className="bg-purple-700 py-1 px-2 text-white text-xs font-bold">
                            YOU
                          </span>
                        )}
                      </p>
                      <p className="ml-2 text-gray-500">{item.date}</p>
                    </div>
                    <ReplyButton
                      onClick={() =>
                        handleReplyClick(index, item.id, item.pseudo)
                      }
                      pseudo={item.pseudo}
                      isCurrentUser={item.pseudo === "juliusomo"}
                    />
                  </div>
                </div>
                {editingCommentId === item.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full border h-20 rounded-lg p-2"
                    />
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="mt-2 text-white bg-purple-700 rounded-lg px-4 py-1"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <CommentContent comment={item.comment} />
                )}
              </div>
            </motion.section>

            {item.reply && item.reply.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:mt-2 md:ml-14 mt-2 ml-4 pl-4 border-l-2 border-gray-300"
              >
                {item.reply.map((reply) => (
                  <li
                    key={reply.id}
                    className="flex md:flex-row flex-col mt-5 items-start bg-white text-black rounded-xl shadow-lg p-4"
                  >
                    <CounterQuantity quantityUser={reply.quantity} />
                    <div className="flex-grow">
                      <div className="flex justify-between w-full">
                        <ProfileImage
                          src={reply.img}
                          alt={`Photo de profil de ${reply.pseudo}`}
                        />
                        <div className="flex flex-grow justify-between items-center">
                          <div className="flex flex-col md:flex-row">
                            <p className="flex-grow font-bold ml-2">
                              {reply.pseudo}
                              {reply.pseudo === "juliusomo" && (
                                <span className="ml-2 bg-purple-700 py-1 px-2 text-white text-xs font-bold">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="ml-2 text-gray-500">{reply.date}</p>
                          </div>
                        </div>
                        <ReplyButton
                          onClick={() =>
                            handleReplyClick(index, item.id, reply.pseudo)
                          }
                          pseudo={reply.pseudo}
                          isCurrentUser={reply.pseudo === "juliusomo"}
                        />
                      </div>
                      {editingCommentId === reply.id ? (
                        <div className="mt-2">
                          <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="w-full border h-20 rounded-lg p-2"
                          />
                          <button
                            onClick={() => handleSaveEdit(reply.id)}
                            className="mt-2 text-white bg-purple-700 rounded-lg px-4 py-1"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <CommentContent comment={reply.comment} />
                      )}
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}

            {respondIndex === index && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:flex-row items-start w-full bg-white text-black rounded-xl shadow-lg p-4 mt-4"
                aria-label="Formulaire de réponse"
              >
                <ProfileImage
                  src="/assets/avatars/image-juliusomo.png"
                  alt="Image de profil"
                />
                <textarea
                  {...register("comment", { required: true })}
                  placeholder="Add a comment..."
                  className="w-full border h-32 md:h-20 mx-4 rounded-lg p-2"
                  value={watch("comment")}
                  onChange={(e) => setValue("comment", e.target.value)}
                  aria-label="Votre commentaire"
                />
                {errors.comment && (
                  <span className="text-red-500">{errors.comment.message}</span>
                )}
                <button
                  type="submit"
                  className="text-white bg-purple-700 rounded-lg px-8 py-2 mt-2 md:mt-0"
                >
                  Send
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
