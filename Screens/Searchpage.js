import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Get the navigation object
  const navigation = useNavigation();

  // Example data for the menu items
  const menuItems = [
    { id: '1', title: 'Banku', icon: '🍲' },
    { id: '2', title: 'Omotuo', icon: '🍚' },
    { id: '3', title: 'Konkonte', icon: '🍲' },
    { id: '4', title: 'Fried Rice', icon: '🍚' },
    // Add more items...
  ];

  // Example data for the drinks
  const drinkItems = [
    { id: '1', title: 'Coca Cola', icon: '🥤' },
    { id: '2', title: 'Malt', icon: '🍺' },
    // Add more drinks...
  ];

  // Function to filter the items based on the search query
  const getFilteredItems = (items) => {
    if (!searchQuery.trim()) return items; // Return all items if search query is empty
    // Return items that match the search query
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuItemText}>{item.icon} {item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Search for food and drinks"
          underlineColorAndroid="transparent"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Text style={styles.sectionTitle}>Popular menu</Text>
      <FlatList
        data={getFilteredItems(menuItems)}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.sectionTitle}>Drinks</Text>
      <FlatList
        data={getFilteredItems(drinkItems)}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Feather name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
          <Feather name="search" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Clipboard')}>
          <Feather name="clipboard" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <Feather name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 16,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 20,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  menuItemText: {
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#cccccc',
  },
});

export default App;
