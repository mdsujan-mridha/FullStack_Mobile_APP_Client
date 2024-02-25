import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { colors, formHeading } from '../styles/styles'
import { Button } from 'react-native-paper'
import { io } from 'socket.io-client';

const Chat = () => {

    const socket = useMemo(
        () =>
            io("http://192.168.31.41:5000", {
                withCredentials: true,
            }),
        []
    );

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    //    select type 
    const sendMessage = (messageContent) => {
        const newMessage = { content: messageContent, type: "sent" };
        setMessages([...messages, newMessage]);
        // emit the message 
        socket.emit("message", messageContent);

    }

    const messageHandler = () => {
        socket.emit("message", message);
        console.log(message);
        setMessage("");
    }

    useEffect(() => {
        // Listener for receiving messages
        socket.on("receive-message", (receivedMessage) => {
            const newMessage = { content: receivedMessage, type: "received" };
            setMessages([...messages, newMessage]);
        });

        return () => {
            // Clean up socket listener
            socket.off("receive-message");
        };
    }, [messages]);

    // console.log(messages);

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
                <View>
                    {messages.map((msg, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: msg.type === "sent" ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                            <View style={{ backgroundColor: msg.type === "sent" ? colors.color3 : colors.color2, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ color: msg.type === "sent" ? colors.color2 : colors.color1 }}>{msg.content}</Text>
                            </View>
                        </View>
                    ))}
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

            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({})
