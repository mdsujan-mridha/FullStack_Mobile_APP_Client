import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle, formHeading, formStyles, inputStyling } from '../styles/styles'
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createProduct } from '../components/action/productAction';

const NewDonation = () => {
   const dispatch = useDispatch();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = () => {
        // console.log({productName, description, phoneNumber, location, price, quantity, category});
        dispatch(createProduct(productName, description, phoneNumber, location, price, quantity, category));
    }



    return (
        <View
            style={defaultStyle}
        >
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> Donate Your food! </Text>
            </View>

            <ScrollView style={formStyles}>
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
                    onPress={handleSubmit}
                    style={{ backgroundColor: "rgba(227,25,99,1)", }}> 
                    <Text style={{ color: "#ffff", fontSize: 17, fontWeight: 900 }}> Donate </Text> </Button>
            </ScrollView>
        </View>
    )
}

export default NewDonation

const styles = StyleSheet.create({})