import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PasswordResetScreen = ({ route, navigation }) => {
  const email = route.params?.email || '';
  const [newPassword, setNewPassword] = useState('');  // Define the newPassword state variable

  const resetPassword = () => {
    if (email) {
      // API call to reset the password with the new password
      console.log('Resetting password for email:', email, 'New Password:', newPassword);

      // Navigate back to the login screen after successful password reset
      navigation.popToTop(); // Assuming the login screen is the first in the stack
    } else {
      console.log('Email is not provided');
      // Handle the case where email is not provided (optional)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter New Password</Text>
      <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={resetPassword} />
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
    // The button style is not used here as Button component from 'react-native' does not accept style props
});

export default PasswordResetScreen;
