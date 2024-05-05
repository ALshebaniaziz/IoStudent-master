import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFetch } from '@/hooks';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const Courses = () => {
  const { data, error, isLoading } = useFetch('/student/courses');
  const [coursesData, setCoursesData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setCoursesData(data);
    if (error) router.replace('/logoIn');
  }, [isLoading]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.tableRow}>
         <View style={styles.tableCell}>
          <Text style={styles.columnHeader}>الحالة</Text>
          <Text style={styles.columnHeader}>{item.IsCompleted ? 'منجز' : 'غير منجز'}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.columnHeader}> الوحدات</Text>
          <Text style={styles.columnHeader}>{item.CourseUnits}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.columnHeader}> اسم المقرر</Text>
          <Text style={styles.columnHeader}> {item.Title}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.columnHeader}>رقم المقرر</Text>
          <Text style={styles.columnHeader}>{item.Code}</Text>
        </View>
      
       
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>المقررات المنجزة</Text>
      </View>
      <FlatList
        data={coursesData?.Courses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign:"right",
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderColor: 'black', 
    borderWidth: 2, 
    textAlign:'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor:'#FFFBDA',
     borderColor: '#FD4C00',
    borderWidth: 2,
    borderRadius:15,
    textAlign:'center',
  
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign:"right",
  },
  columnHeader: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign:'center',
  },
  text:{
textAlign:'center'

  }
});