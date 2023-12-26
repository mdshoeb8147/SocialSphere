import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { getValues } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-blue-300 w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:p-0 flex flex-row-reverse bg-blue-200 rounded-xl overflow-hidden shadow-xl ">
        {/* right */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white ">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ade] font-semibold ">
              SocialSphere
            </span>
          </div>
          <p className="text-slate-600 text-base font-semibold">
            Create your account
          </p>
          <form
            className="py-8 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="firstName"
                placeholder="firstName"
                label="First Name"
                type="firstName"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                styles="w-full "
                labelStyles="ml-2"
                error={errors.firstName ? errors.firstName.message : ""}
              />
              <TextInput
                name="lastName"
                placeholder="lastName"
                label="Last Name"
                type="lastName"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                styles="w-full "
                labelStyle="ml-2"
                error={errors.lastName ? errors.lastName.message : ""}
              />
            </div>
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full "
              labelStyle="ml-2"
              error={errors.email ? errors.email.message : ""}
            />
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                styles="w-full "
                labelStyle="ml-2"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <TextInput
                placeholder="Password"
                label="confirm Password"
                type="Password"
                styles="w-full "
                labelStyle="ml-2"
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password != value) {
                      return "Password do not match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed "
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }`}
              >
                {" "}
                {errMsg?.message}
              </span>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={` bg-blue-700 text-white justify-center rounded-full  px-8 py-3 text-sm font-medium  outline-none`}
                title="Create Account"
              />
            )}
          </form>
          <p className="text-slate-600 text-sm">
            {" "}
            Already has an account ?{" "}
            {
              <Link
                to="/login"
                className="text-[#065ad8] font-semibold ml-2 cursor-pointer "
              >
                Login
              </Link>
            }
          </p>
        </div>
        {/* left */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue-400">
          <div className="relative w-full flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Bg Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />
            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection size={14} />
              <span className="text-xs font-medium">Connect</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6  py-2 px-5 rounded-full">
              <AiOutlineInteraction size={14} />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friends & have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and world
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
