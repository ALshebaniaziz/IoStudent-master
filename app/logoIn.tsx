import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Image } from 'react-native';
import CITLogo from '@/assets/images/CIT_Logo.png';
import { useRouter } from 'expo-router';

const logoIn = () => {
  const [RegNo, setRegNo] = useState('');
  const [Password, SetPassword] = useState('');
  const { onLogin } = useAuth();
  const router = useRouter();

  const login = async () => {
    const result = await onLogin!(RegNo, Password);
    router.replace('/(tabs)/profile');
    if (result && result.message) {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={CITLogo} style={styles.image} />
      <View>
        <Text style={styles.headerText}>كلية التقنية الصناعية منظومة الجداول والنتائج والمقرارات</Text>
      </View>
      <View>
        <Text style={styles.headerText}>تسجيل دخول الطالب</Text>
      </View>
    </View>
    <View style={styles.form}>
      <Text style={styles.textAboveInput}> إدخال رقم القيد:</Text>
      <TextInput
        style={styles.input}
        placeholder="رقم القيد"
        onChangeText={(text: string) => {
          setRegNo(text);
        }}
        value={RegNo}
        keyboardType="numeric"
      />
      <Text style={styles.textAboveInput}> إدخال كلمة المرور:</Text>
      <TextInput
        placeholder="كلمة المرور"
        secureTextEntry={true}
        onChangeText={(text: string) => SetPassword(text)}
        style={styles.input}
        value={Password}
      />
    

    <TouchableOpacity style={styles.button} onPress={login}>
  <Text style={styles.buttonText}>تسجيل الدخول</Text>
</TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '80%',
    alignItems: 'center',
 
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    bottom:30 ,
   
 
  },

  form: {
    width: '80%',
    marginTop:10,
  },
  input: {
    height: 44,
    borderWidth: 3,
    borderRadius: 23,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 5,
    textAlign:"center",
    borderColor:'#FD4C00',
    bottom:30,
    fontSize: 20
 
  },
  headerText: {
    bottom:50,
    fontSize: 20, 
    fontWeight: 'bold',
   paddingBottom:20 ,
   textAlign:'center',
  },
 
  textAboveInput: {
    
    textAlign: 'right',
    marginBottom: 5,
    bottom:30,
    fontSize: 16, 
    fontWeight: 'bold',
    
  },
  button: {
    backgroundColor: '#FD4C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
  
    marginTop: 10, // تم تغيير القيمة إلى 10 بدلاً من 20
    width: '70%',
    left:45,
    borderWidth: 3,
    borderRadius: 23,
    bottom:30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default logoIn;