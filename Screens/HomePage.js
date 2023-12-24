import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = (foodType) => {
    navigation.navigate('Details', { foodType });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="map-pin" size={15} color="black" /> 
        <Text style={styles.headerText}>University of Ghana</Text>
      </View>

      {/* Content */}
      <ScrollView>
        <Text style={styles.greeting}>Hello Daniel!</Text>

        <View style ={styles.foodrow}>
        <TouchableOpacity onPress={() => navigation.navigate('Omotuo')}>
          <Image source={require('../assets/Omotuo.png')} style={styles.foodImage} />
          <Text style = {styles.foodtext}>Omotuo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Konkonte')}>
          <Image source={require('../assets/Konkonte.png')} style={styles.foodImage} />
          <Text style = {styles.foodtext}>Konkonte</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Banku')}>
          <Image source={require('../assets/Banku.png')} style={styles.foodImage} />
          <Text style = {styles.foodtext}>Banku</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FriedRice')}>
          <Image source={require('../assets/friedrice.png')} style={styles.foodImage} />
          <Text style = {styles.foodtext}>Fried Rice</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Softdrink')}>
          <Image source={require('../assets/Softdrinks.png')} style={styles.drinkImage} />
          <Text style = {styles.foodtext}>Soft Drinks</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('liquor')}>
          <Image source={require('../assets/liquor.png')} style={styles.drinkImage} />
          <Text style = {styles.foodtext}>Liquor</Text>
        </TouchableOpacity>
        </View>

       
        {/* Repeat for other food types */}

        {/* Bottom Navigation Bar */}
      </ScrollView>
     {/* Bottom Navigation Bar */}
     <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Feather name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Searchpage')}>
          <Feather name="search" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
          <Feather name="clipboard" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Feather name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  foodrow:{
   display:"flex",
   flexDirection:"row",
   alignItems:"center",
   justifyContent:"center",
   flexWrap:"wrap"
  },
  drinkImage:{
    margin: 15,
  },
  foodtext:{
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop:25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    margin:5
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    margin: 16,
  },
  foodImage: {
    width: 160,
    height: 138, // Set your desired height
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  // Add other styles as needed
});

export default HomeScreen;



