import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Review, ReviewSaved, ReviewsResponse } from "../../interfaces/reviewsInterface";
import movieApi from "../../api/movieApi";
import { Alert } from "react-native";

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
        console.log('entrando');
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if(token) {
            console.log('entrando 2');
            try {
                const response = await movieApi.get<ReviewsResponse>('/reviews');
            setReviews([...response.data.reviews]);
            // console.log(response.data.reviews);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('else loadReviews', 'reviews');
        }
        
        
    }

    const addReview = async(title: string, description: string, qualification: string) => {
        console.log({title,description,qualification});
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await movieApi.post<ReviewSaved>('/reviews',{title,description,qualification});
            console.log(response.data);
           Alert.alert('Review sent')
        } catch (error) {
            console.log(error);
        }
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