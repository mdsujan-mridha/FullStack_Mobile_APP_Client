

import {  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-paper';
import { colors } from '../styles/styles';

const Header = ({ back, emptyCart }) => {
    const navigate = useNavigation();
    const route = useRoute();

    // empty cart handler 
    const emptyCartHandler = () => {

    }

    return (
        <View
            style={{
                marginTop: 50,
                marginBottom: 30
            }}
        >
            {
                back && (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            left: 20,
                            top: 40,
                            zIndex: 10,
                        }}
                        onPress={() => navigate.goBack()}
                    >

                        <Avatar.Icon
                            style={{
                                backgroundColor: colors.color4,
                            }}
                            icon={"arrow-left"}
                            color={
                                route.name === "productDetails" ? colors.color2 : colors.color3
                            }
                        />
                    </TouchableOpacity>
                )
            }
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 20,
                    top: 40,
                    zIndex: 10,
                }}
                onPress={emptyCart ? emptyCartHandler : () => navigate.navigate("cart")}
            >
                <Avatar.Icon
                    style={{
                        backgroundColor: colors.color4,
                    }}
                    icon={emptyCart ? "backspace-reverse" : "cart-outline"}
                    color={
                        route.name === "productDetails" ? colors.color2 : colors.color3
                    }
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header

