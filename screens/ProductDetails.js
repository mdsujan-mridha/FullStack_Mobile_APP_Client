import { View, Text, Dimensions, Image, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails } from '../components/action/productAction';
import Toast from 'react-native-toast-message';
import Loader from '../components/Layout/Loader';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';



const ProductDetails = ({ route: { params } }) => {

    // const dispatch = useDispatch();
    // console.log(params?.id)
    const id = params?.id;
    // console.log(id);
    // const { product, loading, error } = useSelector((state) => state?.productDetails);
    const [product, setProduct] = useState({});
    const loading = false;
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     try {
    //         if (error) {
    //             Toast.show(error);
    //             dispatch(clearErrors())
    //         }
    //         dispatch(getProductDetails(params?.id))
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }, [params]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://emerald-capybara-slip.cyclic.cloud/api/v1/product/${id}`);
                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handlePhoneNumberClick = () => {
        Linking.openURL(`tel:${product?.phoneNumber}`);
    };

    // console.log(product)
    // console.log(product?.images[0]?.url)

    // const image = product?.images[0]?.url;
    // console.log(image)

    const handleLocationClick = () => {
        // Construct the Google Maps URL with the location parameter
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product?.location)}`;

        // Open the URL in the default browser or the Google Maps app
        Linking.openURL(googleMapsUrl);
    };

    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
                backgroundColor: colors.color1
            }}
        >
            <Header back={true} />
            <>
                {
                    loading ?
                        (<Loader />)
                        :
                        (
                            <>
                                {/* <Image

                                    source={{
                                        uri: image,
                                    }}
                                    style={{
                                        width: 250,
                                        height: 250,
                                        borderRadius: 5,
                                        backgroundColor: colors.color5,
                                        margin: 60,


                                    }} /> */}

                                <View
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

                                            <TouchableOpacity
                                                onPress={handleLocationClick}
                                            >
                                                <Text style={{ fontSize: 18, fontWeight: 900 }}> Collection Details: {product?.location}
                                                </Text>
                                            </TouchableOpacity>

                                            <Avatar.Icon size={30} icon="google-maps" style={{ marginTop: 10 }} />
                                        </View>
                                        <TouchableOpacity onPress={handlePhoneNumberClick}>
                                            <Text style={{ fontSize: 18, fontWeight: 900 }}>
                                                Phone Number: {product?.phoneNumber}
                                            </Text>
                                        </TouchableOpacity>
                                        <Avatar.Icon size={50} icon="message" />
                                    </View>
                                </View>
                            </>
                        )
                }
            </>

        </View>
        // <>

        // </>
    )
}

export default ProductDetails