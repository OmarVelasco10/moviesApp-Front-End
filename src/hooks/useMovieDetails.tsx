import { useState, useEffect } from "react";

import movieDB from "../api/movieDB";
import { MovieFull } from "../interfaces/movieInterface";
import { Cast, CredtisResponse } from "../interfaces/creditsInterface";

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    try {
      const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
      const castPromise = movieDB.get<CredtisResponse>(`/${movieId}/credits`);

      const [movieDetailsResponse, castResponse] = await Promise.all([
        movieDetailsPromise,
        castPromise,
      ]);

      setState({
        isLoading: false,
        movieFull: movieDetailsResponse.data,
        cast: castResponse.data.cast,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
