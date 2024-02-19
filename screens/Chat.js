import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { colors, formHeading } from '../styles/styles'
import { Button } from 'react-native-paper'
import { io } from 'socket.io-client';

const Chat = () => {

    const socket = useMemo(
        () =>
            io("https://emerald-capybara-slip.cyclic.cloud", {
                withCredentials: true,
            }),
        []
    );

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const messageHandler = (e) => {
        socket.emit("message", message);
        setMessage("");
    }

    useEffect(() => {

        socket.on("connect", () => {
            console.log("connected", socket.id);
        });

        socket.on("receive-message", (data) => {
            console.log(data);
            setMessages((messages) => [...messages, data]);

        })

        socket.on("welcome", (s) => {
            console.log(s);
        });

        return () => {
            socket.disconnect();
        };

    }, [socket]);

    console.log(messages);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={{ marginTop: 40, flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={formHeading}> Donate Your food! </Text>
                </View>



                <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <TextInput
                        placeholder='Enter your message'
                        style={{
                            height: 80,
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 20,
                        }}
                        value={message}
                        onChangeText={(e) => setMessage(e)}
                    />
                    <Button
                        style={{
                            backgroundColor: colors.color3,
                            marginTop: 10
                        }}
                        onPress={messageHandler}
                    >
                        <Text style={{ color: colors.color2 }}> Send </Text>
                    </Button>
                </View>
                <View>
                    {
                        messages?.map((m, i) => (
                            <Text key={i}> {m} </Text>
                        ))
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({})
