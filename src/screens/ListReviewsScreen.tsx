import React, { useContext, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import { ReviewsContext } from "../context/reviewsContext/ReviewsContext";
import { CardReview } from "../components/CardReview";
import { Background } from "../components/Background";

export const ListReviewsScreen = () => {
  const { reviews, loadReviews } = useContext(ReviewsContext);
  const [isRefresing, setIsRefresing] = useState(false);

  const loadReviewsFromBackend = async () => {
    try {
      setIsRefresing(false);
      await loadReviews();
      setIsRefresing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Background />
      <View>
        <FlatList
          data={reviews}
          keyExtractor={(p, index) => `${p.id} + ${index}`}
          renderItem={({ item }) => (
            <CardReview
              title={item.title}
              description={item.description}
              qualification={item.qualification}
              username={item.user.name}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefresing}
              onRefresh={loadReviewsFromBackend}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
});
