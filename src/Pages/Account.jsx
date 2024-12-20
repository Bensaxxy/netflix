/** @format */

import React from "react";
import SavedShows from "../Components/SavedShows";

const Account = () => {
  return (
    <>
      <div className=" w-full text-white">
        <img
          className=" w-full h-[350px] object-cover"
          src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
        />
        <div className=" bg-black/70 fixed top-0 left-0 w-full h-[350px]"></div>
        <div className=" absolute top-[20%] p-4 md:p-8">
          <h1 className=" font-bold text-3xl md:text-5xl">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
