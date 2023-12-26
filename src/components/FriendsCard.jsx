// import { Link } from "react-router-dom";
// import { NoProfile } from "../assets";
// import PropTypes from "prop-types"; // Import PropTypes

// const FriendsCard = ({ friends }) => {
//   return (
//     <div>
//       <div className="w-full bg-blue-400 shadow-sm rounded-lg px-6 py-5">
//         <div className=" flex items-center justify-between text-white pb-2 border-b border-[#66666645]">
//           <span>Friends</span>
//           <span>{friends?.length}</span>
//         </div>
//         <div className="w-full flex flex-col gap-4 pt-4">
//           {friends?.map((friends) => (
//             <Link
//               to={"/profile/" + friends?._id}
//               key={friend?._id}
//               className="w-full flex gap-4 items-center cursor-pointer"
//             >
//               <img
//                 src={friends?.profileUrl ?? NoProfile}
//                 alt={friend?.firstname}
//                 className="w-10 h-10 object-cover rounded-full"
//               />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// FriendsCard.propTypes = {
//   friends: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string,
//       profileUrl: PropTypes.string,
//       firstname: PropTypes.string,
//       // Add more prop types as needed
//     })
//   ),
// };
// export default FriendsCard;
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

const FriendsCard = ({ friends }) => {
  return (
    <div>
      <div className="w-full bg-blue-400 shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-white pb-2 border-b border-[#66666645]">
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>
        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend) => (
            <Link
              to={"/profile/" + friend?._id}
              key={friend?._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 ">
                <p className="text-base font-medium text-black">
                  {friend?.firstName}
                  {friend?.lastName}
                </p>
                <span className="text-sm text-blue-100">
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

FriendsCard.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      profileUrl: PropTypes.string,
      firstname: PropTypes.string,
    })
  ),
};

export default FriendsCard;
