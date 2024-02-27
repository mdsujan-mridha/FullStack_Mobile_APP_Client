
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, registerUser } from '../components/action/userAction'
import Loader from '../components/Layout/Loader'
import { defaultImg } from "../assets/profile/profile.jpg";
import mime from "mime";
import { colors } from '../styles/styles'
import Toast from 'react-native-toast-message'

const Register = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    const register = (e) => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        if (avatar !== "") {
            myForm.append("file", {
                uri: avatar,
                type: mime.getType(avatar),
                name: avatar.split("/").pop(),
            })
        }
        dispatch(registerUser(myForm))
    }

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            });
            dispatch(clearErrors)
        }
        if (isAuthenticated === true) {
            Toast.show({
                type: 'success',
                text1: "Register Successfully",
            });
            navigation.navigate("Profile")
        }
    }, [error, isAuthenticated]);

    useEffect(() => {
        if (route.params?.image) setAvatar(route.params.image);
    }, [route.params]);

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "#fff",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "70%"
                                }}
                            >
                                <Avatar.Image
                                    style={{
                                        alignSelf: "center",
                                        backgroundColor: colors.color1,
                                    }}
                                    size={80}
                                    source={{
                                        uri: avatar ? avatar : defaultImg,
                                    }}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate("camera")}>
                                    <Button textColor={colors.color1}>Change Photo</Button>
                                </TouchableOpacity>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput
                                    secureTextEntry
                                    style={Styles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <Button
                                disabled={
                                    !email || !password || !name
                                }
                                style={Styles.btn}
                                onPress={register}
                            >
                                <Text style={{ color: "#fff" }}>Register</Text>
                            </Button>
                        </View>
                    </Fragment>)
            }
        </Fragment >
    )
}

export default Register

const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
})