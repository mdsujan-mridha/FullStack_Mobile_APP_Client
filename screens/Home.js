import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { colors, defaultStyle } from "../styles/styles";
import Header from '../components/Header';
import Heading from '../components/Heading';
import ProductCard from '../components/ProductCard';
import { getProduct } from '../components/action/productAction';
import Toast from 'react-native-toast-message';
import { clearErrors } from '../components/action/userAction';
import Loader from '../components/Layout/Loader';


const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [allProducts, setAllProducts] = useState([])
  const {
    loading,
    products,
    error,

  } = useSelector((state) => state.products)

  const categories = [
    "Food",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Biriyani",
  ];
  // state 
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  const navigate = useNavigation();
  const [search, setSearch] = useState("");

  // console.log(products.length);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.navigate("Login")
    }
    if (error) {
      Toast.show(error);
      dispatch(clearErrors())
    }

    const timeOutId = setTimeout(() => {
      dispatch(getProduct(category));
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    }
    // dispatch(getProduct(category));

  }, [isAuthenticated, category]);


  useEffect(() => {
    let apiUrl = 'https://emerald-capybara-slip.cyclic.cloud/api/v1/products';

    // Check if category is set
    if (category) {
      apiUrl += `?category=${category}`;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setAllProducts(data.products))
  }, [category])


  // console.log(category)

  const clearFilter = () => {

    setCategory("");
  }

  // console.log(search)
  const filterProduct = allProducts?.filter((product) =>
    (typeof product.productName === 'string' && product.productName.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <>
      <View style={{
        defaultStyle
      }}>

        <Header />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading
            text1='Our' text2='Products' />
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 40,
            zIndex: 10,
          }}
        >
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder='search'
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#b5b5b5",
              padding: 5,
              paddingLeft: 15,
              borderRadius: 5,
              marginVertical: 15,
              fontSize: 15,
              width: 200,
            }}

          />
        </TouchableOpacity>

      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20
        }}
        showsHorizontalScrollIndicator={false}
      >
        {
          categories &&
          categories?.map((item, index) => (
            <Button
              key={index}
              style={{
                backgroundColor: colors.color5,
                borderRadius: 100,
                margin: 5,
                height: 40,
                marginTop: 20,
              }}
              onPress={() => setCategory(item)}
            >
              <Text> {item} </Text>
            </Button>
          ))
        }
        <Button onPress={clearFilter}> <Text> Reset </Text> </Button>
      </ScrollView>

      {
        loading ?
          (<Loader />)
          :
          (<>
            <ScrollView
              style={{
                backgroundColor: '#e6e6e6'
              }}
            >
              <View style={{
                display: 'flex',
                gap: 20,
                top: 10,
                marginBottom: 20
              }}>
                {
                  filterProduct &&
                  filterProduct?.map((item,index) => (
                    <ProductCard
                      item={item}
                      key={item._id}
                      id={item?._id}
                      i={index}
                      image={item?.images[0]?.url}
                      navigate={navigate}
                    />
                  ))
                }
              </View>
            </ ScrollView>
          </>)
      }
    </>
  )
}

export default Home