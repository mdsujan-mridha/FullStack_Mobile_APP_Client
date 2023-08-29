
import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'react-native-paper'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../components/action/userAction'
import Loader from '../components/Layout/Loader'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    // const registerHandler = () => {
    //     const myForm = new FormData();

    //     myForm.append("name", name);
    //     myForm.append("email", email);
    //     myForm.append("password", password);
    //     setUserData(myForm)
    //     console.log(myForm);
    // }

    // const register = async () => {
    //     try {
    //         const response = await axios.post('https://emerald-capybara-slip.cyclic.cloud/api/v1/register', {
    //             name: name,
    //             email: email,
    //             password: password
    //         })
    //         console.log(response?.data?.success)
    //         if (response?.data?.success) {
    //             alert('Logged in')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         alert(error)
    //     }
    // }



    const register = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password))
    }

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);

        }
        if (isAuthenticated) {
            alert("You are logged in!")
        }
    }, [error, isAuthenticated])

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