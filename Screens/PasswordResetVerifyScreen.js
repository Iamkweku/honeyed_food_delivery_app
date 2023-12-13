import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PasswordResetVerifyScreen = ({ route, navigation }) => {
  // Using optional chaining and providing a default value
  const email = route.params?.email || '';
  const [code, setCode] = useState('');

  const verifyResetCode = () => {
    // API call to verify the reset code
    console.log('Verifying code for email:', email, 'with code:', code);

    // Navigate to the reset password screen after successful verification
    // Only navigate if email is provided
    if (email) {
      navigation.navigate('PasswordReset', { email });
    } else {
      console.log('Email is not provided');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <TextInput
        placeholder="Enter the code sent to your email"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <Button title="Verify Code" onPress={verifyResetCode} />
    </View>
  );
};

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
        borderColor: 'gray',
        borderRadius: 5,
    },
});

export default PasswordResetVerifyScreen;
