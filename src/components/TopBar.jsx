import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbSocial } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";

import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };
  const handleSearch = async (data) => {};
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-blue-600">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-white font-semibold">
          SocialSphere
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="search..."
          styles="w-[18ren] lg:w-[38rem] rounded-1-full py-3"
          register={register("search")}
        />

        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>
      {/* icons */}
      <div className="flex gap-4 items-center text-blue-200 md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-white px-4 md:px-6 py-1 md:py-2 border border-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
