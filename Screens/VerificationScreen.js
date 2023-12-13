import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const VerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Start a timer for the resend button
    const countdown = setInterval(() => {
      setTimer(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(countdown);
  }, []);

  const handleVerify = () => {
    // Implement verification logic here
    navigation.navigate('Onboarding');
  };

  const handleResendCode = () => {
    // Implement resend code logic here
    setTimer(30); // Reset timer
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Almost there</Text>
      <Text style={styles.subtitle}>
        Please enter the 6-digit code sent to your email example@gmail.com for verification.
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter your code"
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
        <Text style={styles.resendText}>
          Didn’t receive any code? Resend Again
        </Text>
      </TouchableOpacity>

      {timer > 0 && (
        <Text style={styles.timerText}>
          Request new code in 00:{timer < 10 ? `0${timer}` : timer}s
        </Text>
      )}
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
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#22C55E',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 10,
  },
  verifyButton: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resendText: {
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  timerText: {
    color: 'gray',
    textAlign: 'center',
  },
});

export default VerificationScreen;
