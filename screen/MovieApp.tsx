import tw from 'twrnc';
import axios from 'axios';
import MovieItem from '../components/MovieItem';
import { SafeAreaView, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
const apiKey =
  'https://api.themoviedb.org/3/movie/popular?api_key=9de14141e749dcfab3d2cb67660e5ec8&language=en-US&page=1';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    axios.get(apiKey).then(res => setMovies(res.data.results));
  }, []);

  return (
    <SafeAreaView style={tw`pt-2 px-3 bg-gray-700`}>
      <Animated.FlatList
        data={movies}
        contentContainerStyle={{ paddingTop: 40 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({
          item: { backdrop_path, title, release_date, vote_average },
          index,
        }) => {
          const scale = scrollY.interpolate({
            inputRange: [0, 120 * index, 120 * (index + 3)],
            outputRange: [1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: [0, 120 * index, 120 * (index + 3)],
            outputRange: [1, 1, 0],
          });

          return (
            <MovieItem
              image={backdrop_path}
              title={title}
              release={release_date}
              vote={vote_average}
              scale={scale}
              opacity={opacity}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MovieApp;
