import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import image1 from "../assets/Food/item1.jpg";
import image2 from "../assets/Food/item2.jpg";
import image3 from "../assets/Food/item3.jpg";
import image4 from "../assets/Food/item4.jpg";
import image5 from "../assets/Food/item5.jpg";
import image6 from "../assets/Food/item6.jpg";
import Icon from 'react-native-vector-icons/AntDesign';

const fakeData = [
  {
    id: 1,
    img: image1,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  },
  {
    id: 2,
    img: image2,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  },
  {
    id: 3,
    img: image3,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  },
  {
    id: 4,
    img: image4,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  },
  {
    id: 5,
    img: image5,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  },
  {
    id: 6,
    img: image6,
    title: 'Cookie',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?',
    price: 20,
    location: 'Dhanmondhi'

  }
]

const Home = () => {

  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.user);



  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.navigate("Login")
    }
  }, [isAuthenticated])


  return (
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
            <View style={{
              width: '100%',
              height: 160,
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 15
            }}
              key={item?.id}
            >
              <View style={{
                width: '40%'
              }}>

                <Image source={item?.img} style={{
                  width: 140,
                  height: 140,
                  borderRadius: 7,
                  marginLeft: 5
                }} />
              </View>
              <View style={{
                width: '60%',
                marginLeft: 0,
                marginRight: 15
              }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 35,
                    fontWeight: 700,
                    marginLeft: 0,

                  }}
                > Cookie </Text>
                <Text
                  style={{
                    textAlign: 'justify',
                    marginRight: 20,
                    fontSize: 16,
                    fontWeight: 500,
                    opacity: 0.6

                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ratione?
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> <Text> <Icon name='tags' size={20} color="#808080" ></Icon> </Text>  <Text> Free  </Text>  </Text>
                  <Text>
                    <Text><Icon name='areachart' size={20} color="#808080" ></Icon> </Text> <Text>Dhanmondhi </Text>
                  </Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    </ ScrollView>
  )
}

export default Home