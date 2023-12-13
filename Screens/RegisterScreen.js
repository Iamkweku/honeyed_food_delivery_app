import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from "axios"

const InputField = ({ iconName, placeholder, secureTextEntry, value, onChangeText, keyboardType }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
    <Feather name={iconName} size={20} color="grey" style={styles.icon} />
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async() => {
    try{
      const response = await axios.post("https://10.21.18.88:5000/register/",
       {full_name, email, phone, password})

      if(response.status === 200){
        Alert.alert("Success", "Successfuly registered")
        navigation.navigate('Verification');
      }else{
        Alert.alert("Warning", "User already exist")
      }
    }catch(error){
      console.log(error)
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subtitle}>by creating a free account.</Text>

      <InputField
        iconName="user"
        placeholder="Full name"
        value={full_name}
        onChangeText={setFullName}
      />

      <InputField
        iconName="mail"
        placeholder="Valid email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        iconName="phone"
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhoneNumber}
      />

      <InputField
        iconName="lock"
        placeholder="Strong Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>Already a member? Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#22C55E',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signInText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000000',
  },
});

export default RegisterScreen;
