import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

export const fakeData = [
  {
    _id: 1,
    img: image1,
    title: 'Chocolate Fondue',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi',
    category:"Food",
    Stock:34

  },
  {
    _id: 2,
    img: image2,
    title: 'Hamburger',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 30,
    location: 'Uttara',
    category:"Food",
    Stock:34

  },
  {
    _id: 3,
    img: image3,
    title: 'Caesar Salad',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 50,
    location: 'Dhanmondhi',
    category:"Food",
    Stock:34

  },
  {
    _id: 4,
    img: image4,
    title: 'Falafel',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Mirpur 12',
    category:"Food",
    Stock:34

  },
  {
    _id: 5,
    img: image5,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Kalabagan',
    category:"Food",
    Stock:34

  },
  {
    _id: 6,
    img: image6,
    title: 'Moussaka',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi',
    category:"Food",
    Stock:34

  }
]

const Home = () => {

  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.user);

  const categories = [
    {
      __id: 1,
      name: "Food-1"
    },
    {
      __id: 2,
      name: "Food-2"
    },
    {
      __id: 3,
      name: "Food-3"
    },
    {
      __id: 4,
      name: "Food-4"
    },
    {
      __id: 5,
      name: "Food-5"
    },
    {
      __id: 6,
      name: "Food-6"
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



  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.navigate("Login")
    }
  }, [isAuthenticated])


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
            fakeData?.map((item) => (
              <ProductCard
                item={item}
                key={item._id}
                _id={item?._id}
                navigate={navigate}
              />
            ))
          }
        </View>
      </ ScrollView>
    </>
  )
}

export default Home