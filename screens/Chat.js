import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { colors,formHeading } from '../styles/styles'
import { Button } from 'react-native-paper'

const Chat = () => {

    const [message, setMessage] = useState("");

    const messageHandler = (e) => {
        setMessage(e)
    }

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
                    <Text style={{ fontSize: 17 }}> {message} </Text>
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
                        onChangeText={(text) => setMessage(text)}
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
