
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const MenuItem = ({ name, price, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(name, newQuantity, price);
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(name, newQuantity, price);
    }
  };

  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>{name} (GHC{price})</Text>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={decrement}>
          <AntDesign name="minus" size={20} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={quantity.toString()}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={increment}>
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const navigation = useNavigation();
  const [selectedSoup, setSelectedSoup] = useState();
  const [order, setOrder] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const updateQuantity = (name, quantity, price) => {
    const newOrder = order.filter(item => item.name !== name);
    if (quantity > 0) {
      newOrder.push({ name, quantity, price });
    }
    setOrder(newOrder);
  };

  const addToCart = () => {
    // Calculate the total price of the current order items
    let total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (selectedSoup) {
        // Add the soup to the order with a price of 0
        order.push({ name: selectedSoup, quantity: 1, price: 0 });
    }

    // Navigate to the OrderScreen with the updated order and total
    navigation.navigate('OrderScreen', { order, total });
};


  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Konkonte.png')} style={styles.foodImage} />
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Konkonte</Text>
      <Text style={styles.subtitle}>Main Menu</Text>

      <MenuItem name="Konkonte" price={5} onQuantityChange={updateQuantity} />

      <Text style={styles.sectionHeader}>Select Preferred Soup</Text>
      <TouchableOpacity 
        style={styles.pickerContainer}
        onPress={() => setIsPickerVisible(!isPickerVisible)}
      >
        <Text style={styles.pickerText}>{selectedSoup || "Select Preferred Soup"}</Text>
      </TouchableOpacity>

      {isPickerVisible && (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSoup}
            onValueChange={(itemValue) => {
              setSelectedSoup(itemValue);
              setIsPickerVisible(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Preferred Soup" value="" />
            <Picker.Item label="Light Soup" value="Light Soup" />
            <Picker.Item label="Palm Nut Soup" value="Palm Nut Soup" />
            {/* ... More soup options ... */}
          </Picker>
        </View>
      )}

      <Text style={styles.sectionHeader}>Meat</Text>
      <MenuItem name="Cow Meat" price={10} onQuantityChange={updateQuantity} />
      <MenuItem name="Goat Meat" price={10} onQuantityChange={updateQuantity} />

      <Text style={styles.sectionHeader}>Fish</Text>
      <MenuItem name="Fresh Tilapia" price={20} onQuantityChange={updateQuantity} />

      <TouchableOpacity style={styles.addButton} onPress={addToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  foodImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    borderStyle: 'solid',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginHorizontal: 8,
    width: 40,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  pickerContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    marginBottom: 20,
  },
  pickerWrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
  },
  addButton: {
    backgroundColor: 'orange',
    padding: 16,
    borderRadius: 5,
    margin: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
