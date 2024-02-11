

import { TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-paper';
import { colors } from '../styles/styles';

const Header = ({ back, emptyCart }) => {
    const navigate = useNavigation();
    const route = useRoute();

 

    return (
        <View
            style={{
                marginTop:0,
                marginBottom: 50
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
            >
                <TextInput
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
    )
}

export default Header

