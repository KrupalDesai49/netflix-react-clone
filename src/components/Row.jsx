import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Movie from "./Movie";

const Row = ({ title, fetchURL , rowID,size}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // console.log(movies);

  const slideLeft = () => {
    var slider = document.getElementById("slider"+rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider"+rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="px-4 pt-5 translate-y-1 font-bold text-white md:text-xl">{title}</h2>
      <div className="group relative flex items-center scroll ">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute z-10 ml-4 hidden cursor-pointer rounded-full bg-white opacity-30 hover:opacity-100 group-hover:block "
          size={30}
        />
        <div
          id={"slider"+rowID}
          className="relative py-3  h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} size={size} />
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

export default Row;
