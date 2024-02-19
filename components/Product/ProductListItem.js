
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../styles/styles';


const ProductListItem = ({ i, price, stock, title, category }) => {


    return (
        <>
            <TouchableOpacity
                activeOpacity={-.9}
            >
                <View
                    style={{
                        ...styles.container,
                        backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
                    }}
                >

                    <Text
                        style={{
                            width: 60,
                            color: colors.color2,
                        }}
                    > {price}
                    </Text>
                    <Text
                        style={{
                            maxWidth: 120,
                            color: colors.color2,
                        }}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text style={{
                        width: 60,
                        color: colors.color2,
                    }}
                        numberOfLines={1}
                    >
                        {category}
                    </Text>
                    <Text
                        style={{
                            width: 40,
                            color: colors.color2,
                        }}
                        numberOfLines={1}
                    >
                        {stock}
                    </Text>
                </View>
            </TouchableOpacity>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
});
export default ProductListItem