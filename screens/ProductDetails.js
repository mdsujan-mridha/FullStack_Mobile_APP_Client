import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from '../components/Header'

import img from "../assets/Food/item1.jpg";



const ProductDetails = ({ route: { params } }) => {


    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
                backgroundColor: colors.color1
            }}
        >
            <Header back={true} />


            <Image source={img} style={{
                width: 250,
                height: 250,
                borderRadius: 5,
                backgroundColor: colors.color5,
                margin: 60

            }} />

            <View
                style={{
                    backgroundColor: colors.color2,
                    padding: 25,
                    flex: 1,
                    marginTop: -50,
                    borderTopLeftRadius: 55,
                    borderTopRightRadius: 55,

                }}
            >
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 25,
                        textAlign: 'center'
                    }}
                > Hamburger </Text>
                <Text
                    style={{
                        textAlign: 'justify',
                        marginRight: 20,
                        fontSize: 16,
                        fontWeight: 500,
                        opacity: 0.6,
                        marginTop: 10,
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur placeat sequi incidunt quibusdam dolore, magni laboriosam. Reprehenderit error tenetur vel?
                </Text>
            </View>

        </View>
    )
}

export default ProductDetails