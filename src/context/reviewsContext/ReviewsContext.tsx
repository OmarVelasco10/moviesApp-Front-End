import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Review,
  ReviewSaved,
  ReviewsResponse,
} from "../../interfaces/reviewsInterface";
import movieApi from "../../api/movieApi";
import { Alert } from "react-native";

type ReviewsContextProps = {
  reviews: Review[];
  loadReviews: () => Promise<void>;
  addReview: (
    title: string,
    description: string,
    qualification: string
  ) => Promise<void>;
};

export const ReviewsContext = createContext({} as ReviewsContextProps);

export const ReviewsProvider = ({ children }: any) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const response = await movieApi.get<ReviewsResponse>("/reviews");
        setReviews([...response.data.reviews]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addReview = async (
    title: string,
    description: string,
    qualification: string
  ) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await movieApi.post<ReviewSaved>("/reviews", {
        title,
        description,
        qualification,
      });
      Alert.alert("Review sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loadReviews,
        addReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
