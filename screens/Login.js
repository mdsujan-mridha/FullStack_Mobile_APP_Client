import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader';
import { loginUser } from '../components/action/userAction';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password))
    }

    useEffect(() => {
        if (error) {
            alert(error);
            console.log(error);
        }
        if (isAuthenticated) {
            alert("Login Successful!");
            navigation.navigate("Home")
        }
    }, [error, isAuthenticated])

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<View style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <Text style={{ fontSize: 30, margin: 20, fontWeight: 700 }}> Welcome </Text>
                        <View
                            style={{
                                width: "70%"
                            }}
                        >
                            <TextInput
                                style={Styles.input}
                                placeholder='Email'
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
                            disabled={!email || !password}
                            style={Styles.btn}
                            onPress={loginHandler}
                        >
                            <Text style={{ color: "#fff" }}>Login</Text>
                        </Button>
                        <Text
                            style={{
                                marginTop: 20,
                                fontSize: 25,
                                fontWeight: 700
                            }}
                        >
                            or
                        </Text>
                        <Button
                            style={{
                                backgroundColor: "blue",
                                padding: 5,
                                width: "70%",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    height: 30,
                                    margin: 20,
                                    fontSize: 20,

                                }}
                            > Signup </Text>
                        </Button>
                    </View>)
            }
        </Fragment>
    )
}

export default Login

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