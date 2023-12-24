import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('delivery');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleProceedToPayment = () => {
    navigation.navigate('OrderSuccessScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/payImg.png')} // Replace with your image path
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Choose Payment Method</Text>

        <RadioButton.Group onValueChange={newValue => setPaymentMethod(newValue)} value={paymentMethod}>
          <View style={styles.radioItem}>
            <Text style={styles.radioLabel}>Pay on Delivery</Text>
            <RadioButton value="delivery" />
          </View>
          <View style={styles.radioItem}>
            <Text style={styles.radioLabel}>Pay with MoMo</Text>
            <RadioButton value="momo" />
          </View>
        </RadioButton.Group>

        {paymentMethod === 'momo' && (
          <TouchableOpacity
            style={[styles.picker, styles.networkSelector]}
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text style={styles.networkSelectorText}>
              {selectedNetwork || 'Select Network'}
            </Text>
            {showPicker && (
              <Picker
                selectedValue={selectedNetwork}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedNetwork(itemValue);
                  setShowPicker(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="MTN" value="mtn" />
                <Picker.Item label="Tigo" value="tigo" />
                <Picker.Item label="Vodafone" value="vodafone" />
              </Picker>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    marginRight: 8,
    fontSize: 18,
    color: '#000',
  },
  networkSelector: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  networkSelectorText: {
    fontSize: 18,
    color: '#000',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        color: '#000',
      },
      ios: {},
    }),
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentMethodScreen;
