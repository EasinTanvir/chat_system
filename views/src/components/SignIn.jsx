"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Buttons from "./Buttons";
import InputField from "./InputField";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmitHandler = async (formData) => {
    setLoading(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)]  flex justify-center items-center">
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
          />
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-rose-700 rounded-md font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100  my-3"
          type="submit"
        >
          {loading ? <span>Loading...</span> : "LogIn"}
        </Buttons>
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?{" "}
          <Link
            className="font-semibold underline hover:text-black"
            to="/signup"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
