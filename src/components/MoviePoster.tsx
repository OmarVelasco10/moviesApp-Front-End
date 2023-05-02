import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Movie} from '../interfaces/movieInterface';
import { useNavigation } from '@react-navigation/native';

interface Props {
  movie: Movie;
  width?: number;
  height?: number;
}

export const MoviePoster = ({movie, width = 300, height = 420}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={ () => navigation.navigate('DetailScreen' as never, movie as never)}
    activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7
      }}>
        <View style={styles.imageContainer}>
         <Image source={{uri}} style={styles.image} />
        </View>
   
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex:1,
    backgroundColor: "#000",
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 10,
  }
});
