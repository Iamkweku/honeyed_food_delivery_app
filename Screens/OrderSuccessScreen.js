import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate order tracking progress
    const interval = setInterval(() => {
      setProgress(currentProgress => {
        const nextProgress = currentProgress + 0.1;
        if (nextProgress >= 1) {
          clearInterval(interval);
          return 1; // Finish the progress
        }
        return nextProgress;
      });
    }, 1000); // Update progress every 1 second

    return () => clearInterval(interval);
  }, []);

  // Determine the order status based on progress
  const getOrderStatus = () => {
    if (progress < 0.20) return 'Preparing your order...';
    if (progress < 0.40) return 'Order is on the way...';
    if (progress < 1) return 'Almost there...';
    return 'Delivered!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your order is Successful</Text>
      <Text style={styles.subText}>
        Thank you for ordering from us{'\n'}
        Your order will arrive in 10mins
      </Text>
      <Image
        source={require('../assets/Ordersucessful.png')} // Replace with your local image path
        style={styles.image}
      />
      <Text style={styles.trackingText}>{getOrderStatus()}</Text>
      <Progress.Bar
        progress={progress}
        width={200} // Adjust the width as needed
        color="green" // You can customize the color
        borderWidth={0}
        borderRadius={5}
        useNativeDriver={true}
        animationType="spring"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomePage')} // Replace 'Home' with your home screen's route name
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  trackingText: {
    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
  progressBar: {
    width: '80%',
    height: 20,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default OrderSuccessScreen;
