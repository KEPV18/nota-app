import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../firebaseConfig';
import { globalStyles, colors } from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.error('Google Sign In Error:', error);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[globalStyles.title, styles.title]}>مرحباً بك في Nota</Text>
      <Text style={[globalStyles.text, styles.subtitle]}>
        تطبيق لحفظ وتنظيم روابطك المفضلة
      </Text>
      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={handleGoogleSignIn}
      >
        <Image
          source={require('../assets/google-icon.png')}
          style={styles.googleIcon}
        />
        <Text style={[globalStyles.buttonText, styles.buttonText]}>
          تسجيل الدخول باستخدام Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 10,
  },
});

export default LoginScreen;