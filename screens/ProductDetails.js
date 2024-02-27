import { View, Text, Dimensions, Image, ScrollView, Linking, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import { Avatar } from 'react-native-paper';


import Loader from '../components/Layout/Loader';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const ProductDetails = ({ navigation, route: { params } }) => {

    const { user } = useSelector((state) => state.user);
    const isAdmin = user.role === 'admin';
    const isVolunteer = user.role === "volunteer";

    const id = params?.id;
    const [product, setProduct] = useState({});
    const loading = false;


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

        if (isAdmin || isVolunteer) {
            Linking.openURL(`tel:${product?.phoneNumber}`);
        }
    };
    const image = product?.images ? product?.images[0]?.url : null;
    const handleLocationClick = () => {
        if (isAdmin || isVolunteer) {
            // Construct the Google Maps URL with the location parameter
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product?.location)}`;
            // Open the URL in the default browser or the Google Maps app
            Linking.openURL(googleMapsUrl);
        }
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

                                <View
                                    style={{
                                        backgroundColor: colors.color2,
                                        padding: 10,
                                        flex: 1,
                                        marginTop: -80,
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
                                    > {product?.productName} </Text>
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
                                        Expire Date: {product?.expireDate}
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
                                                <Text style={{ fontSize: 14, fontWeight: 900 }}> Collection Details: {isAdmin || isVolunteer ? product?.location : ""}
                                                </Text>
                                            </TouchableOpacity>

                                            <Avatar.Icon size={30} icon="google-maps" style={{ marginTop: 10 }} />
                                        </View>
                                        <TouchableOpacity onPress={handlePhoneNumberClick}>
                                            <Text style={{ fontSize: 13, fontWeight: 900 }}>
                                                Phone Number: {isAdmin || isVolunteer ? product?.phoneNumber : ""}
                                            </Text>
                                        </TouchableOpacity>
                                        {
                                            isAdmin || isVolunteer ?
                                                <>
                                                    <TouchableOpacity
                                                        style={{
                                                            marginTop: 20,
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: 5,
                                                            backgroundColor: colors.color3,
                                                            height: 40,
                                                            borderRadius: 20
                                                        }}
                                                        onPress={() => navigation.navigate("chat")}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: colors.color2,
                                                                fontSize: 16,
                                                                fontWeight: 800
                                                            }}
                                                        > Chat with donar </Text>
                                                        <Avatar.Icon size={20} icon="message" />
                                                    </TouchableOpacity>
                                                </>
                                                :
                                                <></>
                                        }
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