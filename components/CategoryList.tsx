import GlobalApi from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function CategoryList() {

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      const result = await GlobalApi.GetCategories();

      console.log(result.data.data);

      setCategoryList(result?.data?.data);
    } catch (error) {
      console.log("CategoryList fetch error:", error);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.heading}>Category</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (

          <View style={styles.categoryContainer}>

            <Image
              source={{
                uri: item?.image?.url
              }}
              style={{
                width: 40,
                height: 40,
              }}
            />

            <Text
              style={{
                fontFamily: 'outfit',
                marginTop: 5,
              }}
            >
              {item?.name}
            </Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
});