import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, formHeading, formStyles, inputStyling } from '../styles/styles'
import { Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../components/action/productAction';
import mime from "mime";
import Toast from 'react-native-toast-message';
import { NEW_PRODUCT_RESET } from '../components/constant/productConstant';

const NewDonation = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.newProduct);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");




    const submitHandler = () => {
        const myForm = new FormData();
        myForm.append("productName", productName);
        myForm.append("description", description);
        myForm.append("price", price);
        myForm.append("quantity", quantity);
        myForm.append("category", category);
        myForm.append("location", location);
        myForm.append("phoneNumber", phoneNumber);
        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        });

        // if (categoryID) myForm.append("category", categoryID);

        dispatch(createProduct(myForm));
    };

    useEffect(() => {

        if (error) {
            Toast.show(error);
            dispatch(clearErrors())
        }

        if (success) {
            Toast.show("Post new Product");
            dispatch({ type: NEW_PRODUCT_RESET });
        }

    }, [error, success, dispatch]);

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
    }, [route.params]);

    return (
        <View
            style={defaultStyle}
        >
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> Donate Your food! </Text>
            </View>

            <ScrollView style={formStyles}>

                <View
                    style={{
                        width: 80,
                        height: 80,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                >
                    <Avatar.Image
                        size={80}
                        style={{
                            backgroundColor: colors.color1,
                        }}
                        source={{
                            uri: image ? image : null,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("camera", { newProduct: true })
                        }
                    >
                        <Avatar.Icon
                            icon={"camera"}
                            size={30}
                            color={colors.color3}
                            style={{
                                backgroundColor: colors.color2,
                                position: "absolute",
                                bottom: 0,
                                right: -5,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder='Food name'
                    value={productName}
                    onChangeText={setProductName}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />

                <TextInput
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='location'
                    value={location}
                    onChangeText={setLocation}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='price'
                    value={price}
                    onChangeText={setPrice}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='quantity'
                    value={quantity}
                    onChangeText={setQuantity}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='Category'
                    value={category}
                    onChangeText={setCategory}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='phoneNumber'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <Button
                    onPress={submitHandler}
                    style={{ backgroundColor: "rgba(227,25,99,1)", }}>
                    <Text style={{ color: "#ffff", fontSize: 17, fontWeight: 900 }}> Donate </Text> </Button>
            </ScrollView>
        </View>
    )
}

export default NewDonation

const styles = StyleSheet.create({})