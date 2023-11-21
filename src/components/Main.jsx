import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

//   console.log(movie);

  const tunecateString = (str,num)=>{
    if(str?.length>num){
        return str.slice(0,num)+'...'
    }else{
        return str
    }
  }

  return (
    <div className="h-[550px] w-full text-white group overflow-hidden">
      <div className="h-full w-full ">
        <div className="absolute h-[550px] w-full bg-gradient-to-r from-black  z-10"></div>
        <img
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-[1500ms] ease-in -z-10"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
       
        />
        <div className="absolute top-[20%] w-full p-4 md:p-8 z-20">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border border-gray-300 bg-gray-300 px-5 py-2 text-black hover:bg-black/0 duration-150 hover:text-white">
              Play
            </button>
            <button className="ml-4 border border-gray-300 px-5 py-2 text-white hover:bg-gray-300 duration-150 hover:text-black">
              Watch Later
            </button>
          </div>
          <p className=" text-gray-400 text-sm"> Relesed: {movie?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[50%] text-gray-200 ">{tunecateString(movie?.overview,150)}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
