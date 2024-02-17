import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import Loader from '../components/Layout/Loader';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createTodo, myTodos } from '../components/action/todoAction';
import Toast from 'react-native-toast-message';
import { NEW_TODO_RESET } from '../components/constant/todoConstant';


const Collection = ({ navigation }) => {
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.newTodo);
    const { user } = useSelector((state) => state.user);
    const loading = false;
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // const { loading, error, todos } = useSelector((state) => state.myTodos);

    // const { user } = useSelector((state) => state.user);


    useEffect(() => {
        if (error) {
            Toast.show(error);
            dispatch(clearErrors());
        }
        if (success) {
            Toast.show("Add todo Successfully");
            dispatch({ type: NEW_TODO_RESET })
        }

    }, [dispatch, error]);


    useEffect(() => {
        fetch(`https://emerald-capybara-slip.cyclic.cloud/api/v1/my/todo`)
            .then(res => res.json())
            .then(data => setTodos(data.todos))
    }, [])

    // console.log(todos);



    const handleTodo = (e) => {

        const todoData = {
            title,
            description,
            user: user?._id
        }
        // console.log(myForm);
        dispatch(createTodo(todoData))
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
                                    placeholder='collection Collection'
                                    value={title}
                                    onChangeText={setTitle}
                                />
                                <TextInput
                                    style={Styles.input}
                                    placeholder='collection Description'
                                    value={description}
                                    onChangeText={setDescription}
                                />
                                <Button onPress={handleTodo} style={Styles.btn}>
                                    <Text style={{ color: "#fff" }}> Add </Text>
                                </Button>
                            </View>
                            <ScrollView>

                                {
                                    todos &&
                                    todos.map((item, index) => (
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
                                            <Text style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}> {item?.title}  </Text>
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: 5
                                                }}
                                            >
                                                {/* <IconButton
                                                    icon="database-edit"
                                                    iconColor='white'
                                                    size={40}
                                                    onPress={() => navigation.navigate("updatecollection", { id: item._id })}
                                                >
                                                </IconButton> */}
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>
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

