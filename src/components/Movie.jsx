import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item, size}) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "user", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike((a) => !a);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please!! log in to save a movie");
    }
  };

  const tunecateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <>
      <div className="group hover:scale-105  duration-200 ease-in relative inline-block w-[190px] cursor-pointer p-2 md:p-3 sm:w-[220px] md:w-[230px] lg:w-[250px]">
        <img
          src={`https://image.tmdb.org/t/p/w780/${size==='1'?item?.backdrop_path:item?.poster_path}`}
          alt={item?.title}
          className="rounded"
        />
        <p className="mt-1 w-full text-center text-xs text-white md:text-sm  ">
          {tunecateString(item?.title, 22)}
        </p>
        <div className="absolute left-0 top-0 h-full w-full px-1 text-white opacity-0 hover:bg-black/60 hover:opacity-100 group-hover:backdrop-blur-sm">
          <p className="flex h-full items-center justify-center whitespace-normal text-center text-xs font-bold md:text-sm">
            {" "}
            {item?.title}
          </p>
          <p onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute left-4 top-4 md:top-7 md:left-6 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute left-4 top-4  md:top-7 md:left-6 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
