import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const Loader = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>

            <ActivityIndicator size="small" color="#0000ff" />

        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});