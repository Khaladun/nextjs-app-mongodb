import AllUsers from "@/components/AllUsers";
import React from "react";

const home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center pt-5">
        All Users Page
      </h1>
      <AllUsers />
    </div>
  );
};

export default home;
