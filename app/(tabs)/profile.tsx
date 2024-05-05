import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView,ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useFetch } from '@/hooks';
import { useRouter } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import wave from '@/assets/images/wave.png'





const Page = () => {
  const { onLogout } = useAuth();
  const [student, setStudent] = useState<any>();
  const router = useRouter()
  const { data, isLoading, error, refetch } = useFetch('/student/me');

  useEffect(() => {
    setStudent(data);
    if(error) router.replace('/logoIn')
  }, [isLoading])

  return (
    <SafeAreaView style={{ flex: 1 }}>

       <ScrollView>

    <View style={{ flex: 1, backgroundColor: Colors.light.background,  }}>
    <Image
      source={wave}
           style={{width:'100%', height:150,top:50,}}
                        />
      
      <View style={{ alignItems: 'flex-end', marginVertical: 50 , paddingHorizontal: 50 ,bottom:120,}}>

        <Image source={{ uri: student?.PersonalPicture }} style={styles.image} />
        
        <Text style={styles.name}>الاسم:</Text>
        <Text style={styles.heder}> {student?.StudentName}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="user"
                    size={15} />
                </View>
              </TouchableOpacity>

<Text style={styles.name}>رقم القيد:</Text>
        <Text style={styles.heder}>  {student?.RegistrationNumber}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="trello"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}>القسم العلمي:</Text>
        <Text style={styles.heder}>  {student?.DepartmentName}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="layers"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}>تاريخ الميلاد:</Text>
              <Text style={styles.heder}>{moment(student?.DateOfBirth).format('DD/MM/YYYY')}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="calendar"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}>الجنسية:</Text>
        <Text style={styles.heder}> {student?.Nationality}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="flag"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}> الجنس:</Text>
        <Text style={styles.heder}> {student?.gender}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="sex"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}> البريد الإلكترونى الجامعي:</Text>
        <Text style={styles.heder}>   {student?.citemail || 'لا يوجد حاليا'}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="mail"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text> المعدل العام:</Text>
        <Text style={styles.heder}>{student?.CumulativeAverage}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="award"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}> الوحدات المنجزة:</Text>
        <Text style={styles.heder}>{student?.UnitsCompleted}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="check-circle"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}> معدل شهادة الدبلوم :</Text>
        <Text style={styles.heder}>  {student?.DiplomaGPA}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="award"
                    size={15} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}> رقم الهاتف:</Text>
        <Text style={styles.heder}> {student?.PhoneNumber}</Text>
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="phone-call"
                    size={15} />
                </View>
              </TouchableOpacity>
        <Text style={styles.name}>   النظام الدراسي :</Text>
        <Text style={styles.heder}> {student?.SchoolSystem == 'Regular' ? "نظامي" : student?.SchoolSystem}</Text>
      
        <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="briefcase"
                    size={15} />
                </View>
              </TouchableOpacity>
        
      </View>
      <View style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={() => {onLogout;router.replace('/logoIn')}}
                style={{
                  backgroundColor:Colors.primary,
                  borderRadius:15,
                  width:170,
                  height:50,
                }}>
          <Text
          style={{
            color:Colors.dark.text,
            fontSize:15,
            textAlign:'center',
            paddingVertical:14,
          }}
          >تسجيل الخروج</Text>
      </TouchableOpacity>
      </View>


      
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Page;

const styles = StyleSheet.create({
  image:{
    width: 120, height: 120, borderRadius: 70,
    borderWidth:3,
    borderColor:'black',
    right:80,
    bottom:10,

  },
  viewtext:{
    padding:5,
    margin:5,
    backgroundColor:'',
    borderWidth:1,
borderColor:'black'

  },
  heder:{
    flexDirection: 'row',
    alignItems: 'center',
   width:300,
    height: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight:5,
    textAlign:"right",
    left:10 ,
    fontSize:15,
    fontWeight:'bold'
   
    
    
  },
  profileAction: {
    position: 'absolute',
    left: 18,
    bottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#007bff',
    borderColor:'black',
    borderWidth:2,
    

  },
  name:{
  
    fontSize:16,
    paddingBottom:5,
    fontWeight: 'bold',
    color:'#FD4C00'
  },

})