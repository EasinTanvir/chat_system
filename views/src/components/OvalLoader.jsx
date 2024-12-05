import React from "react";
import { Oval } from "react-loader-spinner";
const OvalLoader = () => {
  return (
    <Oval
      visible={true}
      height="25"
      width="20"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default OvalLoader;
