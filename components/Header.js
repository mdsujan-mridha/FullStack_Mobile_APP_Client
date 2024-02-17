

import { TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-paper';
import { colors } from '../styles/styles';

const Header = ({ back}) => {
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
            
        </View>
    )
}

export default Header

