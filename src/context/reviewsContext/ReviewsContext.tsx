import { createContext, useEffect, useState } from "react";
import { Review, ReviewsResponse } from "../../interfaces/reviewsInterface";
import movieApi from "../../api/movieApi";

type ReviewsContextProps = {
    reviews: Review[];
    loadReviews: () => Promise<void>;
    addReview: (title: string, description: string, qualification: string) => Promise<void>;
}

export const ReviewsContext = createContext({} as ReviewsContextProps);


export const ReviewsProvider = ({ children }: any) =>{
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
      loadReviews();
    }, [])
    

    const loadReviews = async() => {
        const response = await movieApi.get<ReviewsResponse>('/reviews');
        setReviews([...response.data.reviews]);
        // console.log(response.data.reviews);
    }

    const addReview = async(title: string, description: string, qualification: string) => {

    }

    return (
        <ReviewsContext.Provider value={{
            reviews,
            loadReviews,
            addReview
        }}>
            {children}
        </ReviewsContext.Provider>
    )
}