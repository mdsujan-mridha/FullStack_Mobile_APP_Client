import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import image1 from "../assets/Food/item1.jpg";
import image2 from "../assets/Food/item2.jpg";
import image3 from "../assets/Food/item3.jpg";
import image4 from "../assets/Food/item4.jpg";
import image5 from "../assets/Food/item5.jpg";
import image6 from "../assets/Food/item6.jpg";
import { Button } from 'react-native-paper';
import { defaultStyle } from "../styles/styles";
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
  const {
    loading,
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount

  } = useSelector((state) => state.products)

  const categories = [
    {
      __id: 1,
      name: "Appetizers"
    },
    {
      __id: 2,
      name: "Desserts"
    },
    {
      __id: 3,
      name: "Beverages"
    },
    {
      __id: 4,
      name: "Salads"
    },
    {
      __id: 5,
      name: "Soups"
    },
    {
      __id: 6,
      name: "Sandwiches"
    }
  ]

  // state 
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  const navigate = useNavigation();
  

  const categoryButtonHandler = (_id) => {
    setCategory(_id);
    // console.log(_id);
  }

  // const loading = false;

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.navigate("Login")
    }
    if (error) {
      Toast.show(error);
      dispatch(clearErrors())
    }

    const timeOutId = setTimeout(() => {
      dispatch(getProduct());
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    }

  }, [isAuthenticated]);

  // useEffect(() => {

  //   fetch(`https://emerald-capybara-slip.cyclic.cloud/api/v1/products`)
  //     .then(res => res.json())
  //     .then(data => setFakeData(data.products))

  // }, [])

  // console.log(fakeData);
  
  console.log(category)

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
                backgroundColor: category === item.__id ? "red" : "gray",
                borderRadius: 100,
                margin: 5,
                height: 40,
                marginTop: 20,

              }}
              onPress={() => categoryButtonHandler(item.__id)}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: category === item.__id ? "#fff" : "#ffff",
                }}
              > {item?.name} </Text>
            </Button>
          ))
        }
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
                  products &&
                  products?.map((item) => (
                    <ProductCard
                      item={item}
                      key={item._id}
                      id={item?._id}
                      image={item.images[0]?.url}
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