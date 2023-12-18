import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const slides = [
  {
    key: 'one',
    title: 'Get ready to explore a world \n of locally made dishes right \nat your fingertips',
    text: 'Enjoy the convenience of having your \n favorite meals delivered to you, \n wherever you are',
    image: require('../assets/onboarding1.png'), // Make sure the image paths are correct
    backgroundColor: 'white', // You can change the color to match your design
  },
  {
    key: 'two',
    title: 'Are you a fufu lover? \n Don’t worry we’ve \n Got you covered',
    text: 'Eat fufu with discount',
    image: require('../assets/onboarding2.png'), // Make sure the image paths are correct
    backgroundColor: 'white', // You can change the color to match your design
  },
  {
    key: 'three',
    title: 'Eat with a budget as low as \n GH₵15',
    text: 'Tasty and Delicious Food with \n a tasty budget',
    image: require('../assets/onboarding3.png'), // Make sure the image paths are correct
    backgroundColor: 'white', // You can change the color to match your design
  }
];

const OnboardingScreen = ({ navigation }) => {
  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    navigation.replace('HomePage'); // Adjust this as needed for your navigation
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onDone} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppIntroSlider 
      renderItem={renderSlide} 
      data={slides} 
      onDone={onDone}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      bottomButton // Add this prop if you want the button to overlay on top of the dots
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 60,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20,
  },
  text: {
    fontSize: 17,
    color: '#437E9B',
    textAlign: 'center',
    paddingBottom: 150,
    // paddingHorizontal: 30,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36, // Adjust the value as needed for your design
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  activeDotStyle: {
    backgroundColor: 'black',
  },
});

export default OnboardingScreen;
