import { View, Text, Dimensions, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from '../components/Header'

import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails } from '../components/action/productAction';
import Toast from 'react-native-toast-message';
import Loader from '../components/Layout/Loader';



const ProductDetails = ({ route: { params } }) => {

    const dispatch = useDispatch();
    const id = params?.id
    // console.log(id);

    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {

        if (error) {
            Toast.show(error);
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))

    }, [id]);

    console.log(product.images[0].url);
    const image = product?.images[0]?.url;

    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
                backgroundColor: colors.color1
            }}
        >
            {/* <Header back={true} /> */}


            <>
                {
                    loading ?
                        (<Loader />)
                        :
                        (
                            <>
                                <Image 
                                
                                source={{
                                    uri: image,
                                }} 
                                
                                style={{
                                    width: 250,
                                    height: 250,
                                    borderRadius: 5,
                                    backgroundColor: colors.color5,
                                    margin: 60,


                                }} />

                                <ScrollView

                                    style={{
                                        backgroundColor: colors.color2,
                                        padding: 25,
                                        flex: 1,
                                        marginTop: -50,
                                        borderTopLeftRadius: 55,
                                        borderTopRightRadius: 55,

                                    }}
                                >
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 25,
                                            textAlign: 'center'
                                        }}
                                    > {product?.name} </Text>
                                    <Text
                                        style={{
                                            textAlign: 'justify',
                                            marginRight: 20,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            opacity: 0.6,
                                            marginTop: 10,
                                        }}
                                    >
                                        {product?.description}
                                    </Text>
                                    <View style={{
                                        marginTop: 20,
                                    }}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 5,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, fontWeight: 900 }}> Collection Details: {product?.location}

                                            </Text>
                                            <Avatar.Icon size={30} icon="google-maps" style={{ marginTop: 10 }} />
                                        </View>
                                        <Text style={{ fontSize: 18, fontWeight: 900 }}> Phone Number: {product?.phoneNumber} </Text>
                                        <Avatar.Icon size={50} icon="message" />
                                    </View>
                                </ScrollView>
                            </>
                        )
                }
            </>

        </View>
    )
}

export default ProductDetails