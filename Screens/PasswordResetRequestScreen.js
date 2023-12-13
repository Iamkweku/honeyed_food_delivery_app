import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PasswordResetRequestScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const requestPasswordReset = () => {
    // API call to send the reset code to the provided email
    console.log('Requesting password reset for email:', email);
    
    // Navigate to the next screen after successfully sending the code
    navigation.navigate('PasswordResetVerify', { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Reset Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send Reset Code" onPress={requestPasswordReset} />
    </View>
  );
};

// ... Add styles here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#437E9B',
        borderRadius: 10,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
});

export default PasswordResetRequestScreen;
