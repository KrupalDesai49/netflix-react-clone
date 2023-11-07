import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from 'react-icons/ai';


const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();


  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
     if(user?.email){

         onSnapshot(doc(db, 'user', user?.email), (doc) => {
             setMovies(doc.data()?.savedShows);
           })
     }
    
  }, [user?.email]);

  const tunecateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const movieRef = doc(db, 'user', `${user?.email}`)
  const deleteShow = async (passedID) => {
      try {
        const result = movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef, {
            savedShows: result
        })
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <>
      <h2 className="p-4 font-bold text-white md:text-xl">My Shows</h2>
      <div className="group relative flex items-center ">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute z-10 ml-4 hidden cursor-pointer rounded-full bg-white opacity-30 hover:opacity-100 group-hover:block "
          size={30}
        />
        <div
          id={"slider"}
          className="relative  h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="group relative inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
                className="rounded"
              />
              <p className="mt-1 w-full text-center text-xs text-white md:text-sm">
                {tunecateString(item?.title, 22)}
              </p>
              <div className="absolute left-0 top-0 h-full w-full px-1 text-white opacity-0 hover:bg-black/60 hover:opacity-100">
                <p className="flex h-full items-center justify-center whitespace-normal text-center text-xs font-bold md:text-sm">
                  {item?.title}
                </p>
                <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 z-10 mr-4 hidden cursor-pointer rounded-full bg-white opacity-30 hover:opacity-100 group-hover:block "
          size={30}
        />
      </div>
    </>
  );
};

export default SavedShow;
