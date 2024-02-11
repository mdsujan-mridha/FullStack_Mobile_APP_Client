import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import Loader from '../components/Layout/Loader';
import { Avatar, Button } from 'react-native-paper';


const fakeData = [
    {
        id: 1,
        title: "I have collect  briyani today",
        description: "This is sample description",
    },
    {
        id: 2,
        title: "I have collect  briyani today",
        description: "This is sample description",
    },
    {
        id: 3,
        title: "I have collect  briyani today",
        description: "This is sample description",
    }

]


const Collection = () => {
    const loading = false;
    const [todo, setTodo] = useState("");

    const handleTodo = (e) => {

        setTodo(todo);
    }
    return (
        <View style={defaultStyle}>
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> My collection </Text>
            </View>

            {/* if loading  */}
            {
                loading ?
                    (<Loader />)
                    :
                    (
                        <>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <TextInput
                                    style={Styles.input}
                                    placeholder='Add your collection'
                                    value='todo'
                                    onChangeText={handleTodo}
                                />
                                <Button style={Styles.btn}>
                                    <Text style={{ color: "#fff" }}> Add </Text>
                                </Button>
                            </View>
                            <View>

                                {
                                    fakeData &&
                                    fakeData.map((item, index) => (
                                        <View
                                            key={item?._id}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                marginVertical: 10,
                                                marginHorizontal: 10,
                                                backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
                                                padding: 10,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: "#b5b5b5",
                                                width: "100%",
                                                height: 70,
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}>
                                            <Text style={{ fontSize: 17, fontWeight: 900,color:"#fff" }}> {item?.title}  </Text>
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: 5
                                                }}
                                            >
                                                <Avatar.Icon size={30} icon="delete" />
                                                <Avatar.Icon size={30} icon="database-edit" />
                                            </View>
                                        </View>
                                    ))
                                }

                            </View>
                        </>


                    )
            }

        </View>
    )
}



const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
        width: "100%",
    },
    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
        color: "#fff",
    },
})

export default Collection

