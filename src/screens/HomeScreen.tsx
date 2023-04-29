import React, { useContext, useEffect } from 'react';
import ImageColors from 'react-native-image-colors'
import Carousel from 'react-native-snap-carousel';
import {Dimensions, View, ScrollView, ActivityIndicator} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async( index:number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  }

  useEffect(() => {
    if( nowPlaying.length > 0) {
      getPosterColors(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);
  

  if (isLoading) {
    console.log('entrando');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={50} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Main carousel*/}
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={ index => getPosterColors(index)}
            />
          </View>

          {/* Popular movies */}
          <HorizontalSlider title="Popular Movies" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
