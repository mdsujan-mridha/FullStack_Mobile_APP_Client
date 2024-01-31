import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { defaultStyle } from '../../styles/styles';
import Header from '../Header';
import Heading from '../Heading';
import { fakeData } from '../../screens/Home';
import Toast from 'react-native-toast-message';
import CartItem from './CartItem';
import { useNavigation } from '@react-navigation/native';


const Cart = () => {
    const navigate = useNavigation();

    const incrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity + 1;
        if (stock <= newQty) {
            return Toast.show({
                type: "error",
                text1: "Maximum Quantity Reached",
            });

        }

    }

    const decrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {

        }

    }


    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
            }}
        >
            {/* header  */}
            <Header back={true} emptyCart={true} />

            <Heading
                text1='Collection'
                text2='Cart'
                containerStyle={{ paddingTop: 70, marginLeft: 35 }}
            />
            <View
                style={{
                    paddingVertical: 20,
                    flex: 1
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {
                        fakeData.length > 0 ? (
                            fakeData.map((i, index) => (
                                <CartItem
                                    navigate={navigate}
                                    key={index}
                                    id={i._id}
                                    title={i.title}
                                    stock={i.Stock}
                                    amount={i.price}
                                    img={i.img}
                                    qty={i.quantity}
                                    index={index}
                                    incrementHandler={incrementHandler}
                                    decrementHandler={decrementHandler}

                                />
                            ))
                        ) : (
                            <Text> </Text>
                        )
                    }
                </ScrollView>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({})

export default Cart

