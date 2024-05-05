import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import CITLogo from '@/assets/images/CIT_Logo.png';
import { Image } from 'expo-image';
import { useFetch } from '@/hooks';
import { useRouter } from 'expo-router';

const timetable = () => {
  const { data, isLoading, error, refetch } = useFetch('/student/timetable');
  const [timetable, setTimetable] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      setTimetable(data);
    }
    if (error) {
      router.replace('/logoIn');
    }
  }, [isLoading, data, error, router]);

  const daysWithLectures = timetable?.CurrentCourseDates?.reduce((acc: any, course: any) => {
    course.Lectures.forEach((lecture: { Day: any; }) => {
      const day = lecture.Day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push({ ...lecture, NameCourse: course.NameCourse });
    });
    return acc;
  }, {});

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.coursesContainer}>
        <View style={styles.ImgLogo}>
          <Image source={CITLogo} style={{ width: 50, height: 50 }} />
        </View>
        <View>
          <Text style={styles.coursesTitle}>{timetable?.SemesterName}</Text>
          <Text style={styles.coursesText}>الفصل الحالي : {timetable?.Semester}</Text>
        </View>
      </View>

      <Text style={styles.titleCategory}>أيام الاسبوع</Text>
      <View style={styles.scrollView}>
        {daysWithLectures && Object.keys(daysWithLectures).map(day => (
          <TouchableOpacity key={day} onPress={() => handleDaySelect(day)}>
            <View style={styles.dataBox}>
              <Text>{day}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.titleCategory]}>تفاصيل اليوم</Text>
      <ScrollView>
        {selectedDay && daysWithLectures[selectedDay]?.map((lecture: any, index: number) => (
          <View key={index} style={styles.CardCourse}>
         
           <View style={styles.timeCourse}>
                {lecture.Hours.sort((a: { TimeFromTo: string }, b: { TimeFromTo: string }) => a.TimeFromTo.localeCompare(b.TimeFromTo)).map((hour: { TimeFromTo: any }, index: number) => (
                  <Text key={index}>{hour.TimeFromTo}</Text>
                ))}
              </View>
            <View style={styles.infoCourse}>
              <Text style={styles.mainname}>اسم المقرر</Text>
              <View style={styles.namecors}>
              <Text >{lecture.NameCourse} </Text>
              </View>
             
              <Text style={styles.mainname}>اسم المدرس</Text>
              <View style={styles.namecors}>
              <Text>{lecture.CourseTeacher}</Text>
              </View>
              <Text style={styles.mainname}>أسم القاعة</Text>
              <View style={styles.namecors}>
              <Text>{lecture.ClassRoom || lecture.Lab}</Text>
              </View>
              <Text style={styles.mainname} > رقم المجموعة</Text>
              <View >
              <Text style={styles.namecors}> {lecture.Group} </Text>
              <Text style={styles.mainname}>وقت المحاظرة</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  coursesContainer: {
    height: 80,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 30,
   
  },
  ImgLogo: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  coursesTitle: {
    fontWeight: 'bold',
    color: '#4A4947',
    fontSize: 18,
  },
  coursesText: {
    color: '#4A4947',
    fontSize: 15,
  },
  titleCategory: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    textAlign:'center',
  },
  scrollView: {
    height: 80,
    paddingStart: 0,
    flexDirection: 'row',
    alignContent:'center'

  },
  dataBox: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor:'#FFFBDA',
     borderColor: '#FD4C00',

  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  freeArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: '#C7CBCF',
    borderWidth: 1,
    marginLeft: 10,
  },
  CardCourse: {
    height: 240,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBDA',
    elevation: 8,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowColor: '#e0e0e0',
    borderColor: '#FD4C00',
    borderBottomWidth: 2,
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  infoCourse: {
    flexDirection: 'column',
    fontSize: 12,
    color: 'black',
    justifyContent: 'center',
  },
  timeCourse: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    top:135,
    left:30,
    
  },
  namecors:{
right:60,

textAlign:'right',
fontSize:13,
bottom:48,

  },
  mainname:{
fontWeight:'bold',
fontSize:13,
left:12,
bottom:30,



  },
});
