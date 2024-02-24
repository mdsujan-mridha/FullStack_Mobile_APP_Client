import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles/styles';

const ProductCard = ({ item, id, navigate, image,i }) => {
    return (
        <TouchableOpacity style={{
            width: '100%',
            height: 160,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 15,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
        }}
            activeOpacity={1}
            onPress={() => navigate.navigate("productdetails", { id })}
        // onPress={()=>navigate.navigate("productdetails")}
        >
            <View style={{
                width: '40%'
            }}>
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
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
                        fontSize: 25,
                        fontWeight: 700,
                        marginLeft: 0,
                        marginRight: 5,
                        color:"#fff"
                    }}
                > {item?.productName} </Text>
                <Text
                    style={{
                        textAlign: 'justify',
                        marginRight: 20,
                        fontSize: 16,
                        fontWeight: 500,
                        opacity: 0.6,
                        color:"#fff"
                    }}
                >
                    {item?.description}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> <Text> <Icon name='tags' size={20} color="#fff" ></Icon> </Text>  <Text style={{color:"#fff" }}> {item?.price}  </Text>  </Text>
                    <Text>
                        <Text><Icon name='areachart' size={20} color="#fff" ></Icon> </Text> <Text style={{color:"#fff" }}> {item?.location} </Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard