import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ReviewsContext } from '../context/reviewsContext/ReviewsContext';
import { CardReview } from '../components/CardReview';

export const ListReviewsScreen = () => {
  const { reviews } = useContext(ReviewsContext);
  console.log(reviews);
  return (
    <View style={{flex:1, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
      <View>
      <FlatList 
            data={reviews}
            keyExtractor={ (p, index) => `${p.id} + ${index}`}
            renderItem={({item}) => (
              <CardReview title={item.title} description={item.description} qualification={item.qualification} username={item.user.name}/>
           
            )}
        />
      </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    productName: {
      fontSize: 20
    }
});