import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../action/userAction';

const Footer = () => {
    const navigation = useNavigation();
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
        alert("You are logout!")
    }


    useEffect(() => {

        if (isAuthenticated === false) {
            navigation.navigate("Login")
        }
    }, [isAuthenticated, navigation])

    return (
        <View style={{
            padding: 30,
            backgroundColor: "#900",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
        }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon name='home' size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Icon name='user' size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={logoutUser}>
                <Icon name='logout' size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("chat")}>
                <Icon name='message1' size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({})