import { View, Text, Image, Animated } from 'react-native';
import React from 'react';
import tw from 'twrnc';
type TMovieItemProps = {
  image: string;
  title: string;
  release: string;
  vote: string;
  scale: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
};
const MovieItem = ({
  image,
  title,
  release,
  vote,
  scale,
  opacity,
}: TMovieItemProps) => {
  return (
    <Animated.View
      style={[
        tw`flex flex-row my-2 rounded-lg overflow-hidden bg-gray-500`,
        { transform: [{ scale }], opacity },
      ]}
    >
      <Image
        style={{ height: 100, width: 150 }}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${image}`,
        }}
      />
      <View style={tw`p-3 flex flex-col justify-between`}>
        <Text style={tw`font-medium text-4`}>{title}</Text>
        <View>
          <Text style={tw`text-pink-400 text-4 font-medium`}>{vote}</Text>
          <Text>Released: {release}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default MovieItem;
