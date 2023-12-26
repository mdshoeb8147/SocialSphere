import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { updateProfile } from "../redux/userSlice";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaTwitterSquare } from "react-icons/fa";
import PropTypes from "prop-types";
import moment from "moment";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-full bg-blue-400 flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <Link to={"/profile/" + user?._id} className="flex gap-2">
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-white">{user?.profession}</span>
            </div>
          </Link>

          <div className="">
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className="text-blue cursor-pointer"
                onClick={() => dispatch(updateProfile(true))}
              />
            ) : (
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded "
                onClick={() => {}}
              >
                {" "}
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <div className="flex gap-2 items-center text-blue-200">
            <CiLocationOn className="text-xl text-black" />
            <span>{user?.location ?? "Add Location"}</span>
          </div>

          <div className="flex gap-2 items-center text-black">
            <BsBriefcase className="text-lg text-black" />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>

          <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
            <p className="text-xl text-black font-semibold">
              {user?.friends?.length}Friends
            </p>
            <div className="flex items-center justify-between">
              <span>who viewed your profile </span>
              <span className="text-black text-lg">{user?.views?.length}</span>
            </div>
            <span className="text-base text-red-500">
              {user?.verified ? " Verified Account " : "Not Verified"}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-blue text-base">Joined</span>
              <span className="text-blue text-base">
                {moment(user?.createdAt).fromNow()}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 py-4 pb-6">
            <p className="text-lg font-semibold">Social Profile</p>

            <div className="flex gap-2 items-center ">
              <BsInstagram className="text-xl " />
              <span>Instagram</span>
            </div>
            <div className="flex gap-2 items-center ">
              <FaTwitterSquare className="text-xl " />
              <span>Twitter</span>
            </div>
            <div className="flex gap-2 items-center ">
              <BsFacebook className="text-xl " />
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profileUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profession: PropTypes.string,
    location: PropTypes.string,
    friends: PropTypes.array,
    views: PropTypes.array,
    verified: PropTypes.bool,
    createdAt: PropTypes.string,

    // Add more PropTypes as needed based on your user object
  }).isRequired,
};
export default ProfileCard;
