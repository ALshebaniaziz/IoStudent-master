import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useFetch } from '@/hooks';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Grades = () => {
  const { data, error, isLoading } = useFetch('/student/grades');
  const [gradesData, setGradesData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setGradesData(data);
    if (error) router.replace('/logoIn');
  }, [isLoading]);

  const renderTableHeader = () => (
    
    <View style={styles.tableRow}>
      <Text style={styles.tableHeaderCell}>النقاط</Text>
      <Text style={styles.tableHeaderCell}>الدرجة</Text>
      <Text style={styles.tableHeaderCell}>الوحدات</Text>
      <Text style={styles.tableHeaderCell}>اسم المقرر</Text>
      <Text style={styles.tableHeaderCell}>رقم المقرر</Text>
    </View>
  );

  const renderTableData = (courses: any) =>
    courses.map((course: any, index: number) => (
      <View style={styles.tableRow} key={index}>
        <Text style={styles.tableCell}>{course.CourseUnits * course.ScheduledMark}</Text>
        <Text style={styles.tableCell}>{course.ScheduledMark}</Text>
        <Text style={styles.tableCell}>{course.CourseUnits}</Text>
        <Text style={styles.tableCell}>{course.Title}</Text>
        <Text style={styles.tableCell}>{course.Code}</Text>
      </View>
    ));
    function calculateSemesterGpa(courses: any) {
      let x = 0;
      let y = 0;
    
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        x += course.ScheduledMark * course.CourseUnits;
        y += course.CourseUnits * 100;
      }
    
      return (x / y) * 100;
    }

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <FlatList
        data={gradesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.semesterContainer}>
            <Text style={styles.semesterName}>{item.SemesterName}</Text>
            <Text style={styles.semesterNumber}>رقم الفصل الدراسي: {item.SemesterNumber}</Text>
            <View style={styles.tableContainer}>
              {renderTableHeader()}
              {renderTableData(item.Courses)}
            </View>
           
              <View style={styles.Box}>
              <View style={styles.Boxshow} >
              <Text  style={styles.text}>رقم الفصل الدراسي</Text>
                <Text  style={styles.text} >{item.SemesterNumber}</Text>   
              </View>

              <View style={styles.Boxshow}>
              <Text  style={styles.text}>عدد المقررات المسجلة</Text>
                <Text  style={styles.text}>{item.Courses.length}</Text>
              </View>

              <View style={styles.Boxshow}>
              <Text  style={styles.text}> عدد المقررات المنجزة </Text>
                <Text  style={styles.text}>
                  {item.Courses.filter((course: any) => course.IsCompleted).length} 
                </Text>
               
              </View>
              </View>

          
              <View style={styles.Box}>
              <View style={styles.Boxshow}>
              <Text  style={styles.text}>المقررات غير المنجزة</Text>
                <Text  style={styles.text}>
                  {item.Courses.filter((course: any) => !course.IsCompleted).length} 
                </Text>
              </View>


              <View style={styles.Boxshow}>
              <Text  style={styles.text}>   مجموع الوحدات المسجلة</Text>
                <Text  style={styles.text} >
                  {item.Courses.reduce((total: number, course: any) => total + course.CourseUnits, 0)}
                </Text>
              </View>
              

              <View style={styles.Boxshow}>
              <Text  style={styles.text}>المعدل الفصلي</Text>
                <Text style={styles.text} >
                  {calculateSemesterGpa(item.Courses).toFixed(2)}
                </Text> 
              </View>
            </View>


            <View  style={styles.box2}>
              <Text  style={styles.text}>مجموع الوحدات المنجزة</Text>
                <Text style={styles.text}>
                     {item.Courses.reduce((total: number, course: any) => {
                          if (course.IsCompleted) {
                    return total + course.CourseUnits;
                                       } else {
                                             return total;
                                                 }
                                              }, 0)}
               </Text>
             </View>



          </View>
        )}
      />
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  semesterContainer: {
    marginBottom: 16,
  },
  semesterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  semesterNumber: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  tableContainer: {
    backgroundColor: '#f1f8ff',
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor:'#FCFFE0'
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth:1,
borderColor:'#FD4C00',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    
  },

  extraInfoBox: {
    alignItems: 'center',
    
  },
  

  Boxshow:{
width:100,
height:55,
textAlign:'center',
borderWidth:1,
borderColor:'#FD4C00',
backgroundColor:'#FFFBDA'

  },
  Box:{
    padding:5,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  text:{
textAlign:'center',
fontSize:13,
fontWeight:'bold'
  },
  box2:{
    textAlign:'center',
    borderWidth:1,
    width:100,
height:55,
borderColor:'#FD4C00',
backgroundColor:'#FFFBDA',
left:114,
  }
});

export default Grades;