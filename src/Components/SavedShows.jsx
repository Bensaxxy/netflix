/** @format */

import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { IoClose } from "react-icons/io5";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    const slider = document.getElementById("sliderId");
    if (slider) slider.scrollLeft -= 300;
  };

  const slideRight = () => {
    const slider = document.getElementById("sliderId");
    if (slider) slider.scrollLeft += 300;
  };

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(
        doc(db, "users", `${user?.email}`),
        (doc) => {
          setMovies(doc.data()?.savedShows || []);
        }
      );
      return () => unsubscribe();
    }
  }, [user?.email]);

  const moviesRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(moviesRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"sliderId"}
          className="flex w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div key={id}>
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] block cursor-pointer relative p-2">
                <img
                  className="w-full h-auto block"
                  src={
                    item?.img
                      ? `https://image.tmdb.org/t/p/w500/${item.img}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={item?.title || "No Title"}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="text-xs whitespace-normal md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p onClick={() => deleteShow(item.id)}>
                    <IoClose className=" absolute gray-300 top-4 right-4" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;
