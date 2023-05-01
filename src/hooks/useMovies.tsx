import { useEffect, useState } from "react";

import movieDB from "../api/movieDB";
import { MovieDBResponse, Movie } from "../interfaces/movieInterface";

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setmoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    try {
      const nowPlayingPromise = movieDB.get<MovieDBResponse>("/now_playing");
      const popularPromise = movieDB.get<MovieDBResponse>("/popular");
      const topRatedPromise = movieDB.get<MovieDBResponse>("/top_rated");
      const upcomingPromise = movieDB.get<MovieDBResponse>("/upcoming");

      const response = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setmoviesState({
        nowPlaying: response[0].data.results,
        popular: response[1].data.results,
        topRated: response[2].data.results,
        upcoming: response[3].data.results,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //now_playing
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
