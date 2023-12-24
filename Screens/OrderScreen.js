import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = ({ route }) => {
  // Safely accessing order and total using optional chaining and providing default values
  const order = route.params?.order || [];
  const total = route.params?.total || 0;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require('../assets/Omotuo1.png')} // replace with your image path
            style={styles.image}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.title}>Order Summary</Text>
            {order.map((item, index) => (
              <Text key={index} style={styles.itemText}>
                {item.name} - {item.quantity} x GHC{item.price}
              </Text>
            ))}
            <View style={styles.separator} />
            <Text style={styles.totalText}>Total: GHC{total}</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('PaymentMethodScreen')}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  card: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  summaryContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  }
});

export default OrderScreen;
