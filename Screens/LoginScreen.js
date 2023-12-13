import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from "axios"

const InputField = ({ iconName, placeholder, secureTextEntry, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
    <Feather name={iconName} size={24} color="grey" style={styles.icon} />
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async() => {
    try{
      const response = await axios.post("https://localhost:3000/login")
      if(response.status === 200){
        Alert.alert("Success", "Logged in successful")
        navigation.navigate('HomePage');
      }else{
        Alert.alert("Warning", "Invalid credentials!")
      }
    }catch(error){
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require("../assets/logo.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>sign in to access your account</Text>

      <InputField
        iconName="mail"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        iconName="lock"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { /* Implement remember me logic */ }}>
          <Text style={styles.footerText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PasswordResetRequestScreen')}>
          <Text style={styles.footerText}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>New Member? Register now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 25,
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
    // Adjust marginRight if necessary to position the icon correctly.
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerText: {
    color: '#000000',
  },
  signInButton: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#22C55E',
  },
});

export default LoginScreen;