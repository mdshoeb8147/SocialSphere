import { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
// import PropTypes from "prop-types";

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(" ");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666646]"
    >
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="user image"
          className="w-10 h-10 rounded-full object-cover"
        />

        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply@${replyAt}` : "comment this post"}
          register={register("comment", {
            required: "comment can not be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
      </div>
      {errMsg?.message && (
        <span
          role="alert"
          className={`text-sm${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          }mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}
    </form>
  );
};

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {};
  return (
    <div className=" mb-2 bg-blue-300 p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstname}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>
        <div className=" w-full flex justify-between ">
          <div className="">
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium text-lg text-white">
                {post?.userId?.firstName}
                {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-black">{post?.userId?.location}</span>
          </div>
          <span className="text-white">
            {" "}
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className="text-black">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}

          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-black ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less.
              </span>
            ) : (
              <span
                className="text-black ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More...
              </span>
            ))}
        </p>

        {post?.image && (
          <img
            src={post?.image}
            alt="post image"
            className="w-full mt-2 rounded-lg "
          />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center px-3 py-2 text-white text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base cursor-pointer">
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>
        {user?._id === post?.userId && (
          <div
            className=" flex gap-1 items-center text-base text-white cursor-pointer"
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* comments  to be done if any error occurs*/}

      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#66666645] pt-4">
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />
        </div>
      )}
    </div>
  );
};
export default PostCard;
