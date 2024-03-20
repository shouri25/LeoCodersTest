import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';


const Signup = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Complete your account</Text>
        <Text style={styles.subtitle}>Lorem Ipsum dolor</Text>
        <View style={styles.formContainer}>
            <InputField title='First Name' placeholder='Enter your first name' />
            <InputField title='Last Name' placeholder='Enter your last name' />
            <InputField title='Password' placeholder='Create a password' />
            <InputField title='Confirm Password' placeholder='Confirm password' />
            <CustomButton title='Continue with email' />
            <Text style={styles.loginText}>Already have an account? <Text style={styles.login}>Login</Text></Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 22,
    textAlign:'center'
  },
  subtitle: {
    color: 'gray',
    textAlign:'center'
  },
  formContainer:{
    marginTop:24
  },
  loginText:{
    textAlign:'center',
    color: '#000',
  },
  login: {
    textDecorationLine:'underline',
    color:'green'
  }
});
export default Signup;
