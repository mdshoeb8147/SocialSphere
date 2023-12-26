import { useSelector } from "react-redux";
import {
  friends,
  friendRequest,
  requests,
  suggest,
  posts,
} from "../assets/data";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { BiSolidVideo } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsImage, BsPersonFillAdd } from "react-icons/bs";
import { useForm } from "react-hook-form";
import PostCard from "../components/PostCard";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);

  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [posting, setPosting] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {};

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-blue-200 lg:rounded-lg h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* left */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* middle */}
          <div className="flex-1 h-full bg-blue-400 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
              className="bg-blue px-4 rounded-lg "
              onSubmit={handleSubmit(handlePostSubmit)}
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="user image"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <TextInput
                  style="w-full rounded-full py-5"
                  placeholder="what's on your mind...."
                  name="description"
                  register={register("description", {
                    required: "write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed "
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-black-300 hover:text-blue-200 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg , .png, .jpeg"
                  />
                  <BsImage />
                  <span>Images</span>
                </label>

                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-1 text-base text-black-300 hover:text-blue-200 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  htmlFor="vgi"
                  className="flex items-center gap-1 text-base text-black-300 hover:text-blue-200 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgi"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {" "}
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-blue text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className="flex w-full items-center justify-center">
                <p className="text-lg text-black">No Post Available</p>
              </div>
            )}
          </div>

          {/* right */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <div className=" w-full bg-blue-400 shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-white pb-2 border-b-[#66666645]">
                <span>Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4 ">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link
                      to={"/profile/" + from._id}
                      className="w-full flex gap-4 items-center cursor-pointer "
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-white">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-white">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Cancel"
                        containerStyles="bg-white text-xs text-black px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* suggest friend */}
            <div className="w-full bg-blue-400 shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-white border-b border-[#66666645]">
                <span> Friend Suggestion</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend?.id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-white">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-black">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className=" flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => handleFriendRequest(friend?.id)}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
