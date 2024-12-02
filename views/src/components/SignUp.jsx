import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Buttons from "./Buttons";
import InputField from "./InputField";
import api from "../api/api";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmitHandler = async (formData) => {
    console.log(formData);
    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", formData);
      toast.success(data?.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[470px] w-[360px]  shadow-custom rounded-xl  pt-10 pb-7 sm:px-8 px-4"
      >
        <div className="mb-5">
          <h1 className=" text-center  font-bold text-slate-800 text-2xl uppercase ">
            Chat System
          </h1>
          <p className="text-slate-600 text-center">
            Signin and chat with your firent real time
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="UserName"
            required
            id="userName"
            type="text"
            message="UserName is required"
            placeholder="type your first name"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="Email is required"
            placeholder="type your email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="Password is required"
            placeholder="type your password"
            register={register}
            errors={errors}
            min={6}
          />
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-rose-700 rounded-md font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100  my-3"
          type="submit"
        >
          {loading ? <span>Loading...</span> : "Register"}
        </Buttons>{" "}
        <p className="text-center text-sm text-slate-700 mt-2">
          Already have an account?{" "}
          <Link
            className="font-semibold underline hover:text-black"
            to="/signin"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
