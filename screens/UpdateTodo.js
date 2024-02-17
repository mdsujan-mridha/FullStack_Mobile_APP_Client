import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { clearErrors, getTodoDetails, updateTodo } from '../components/action/todoAction';
import { UPDATE_TODO_RESET } from '../components/constant/todoConstant';

const UpdateTodo = ({ route: { params }, navigation }) => {

    const productId = params?.id;

    const dispatch = useDispatch();
    const { error, todo } = useSelector((state) => state.todoDetails);
    const { loading, error: updateError, isUpdate } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");




    useEffect(() => {

        if (todo && todo?._id !== productId) {
            dispatch(getTodoDetails(productId))
        } else {
            setTitle(todo.title);
            setDescription(todo.description);
        }
        if (updateError) {
            Toast.show(updateError);
            dispatch(clearErrors());
        }
        if (isUpdate) {
            Toast.show("Update product successful");
            navigation.navigate("collection")
            dispatch({ type: UPDATE_TODO_RESET });
        }
    }, [todo,updateError, dispatch, isUpdate, navigate, productId]);

    // update product handler 
    const updateProductHandlerSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            user: user?._id
        };
        dispatch(updateTodo(productId, formData));
    }



    return (
        <View style={defaultStyle}>

            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> Update your collection </Text>
            </View>


        </View>
    )
}

export default UpdateTodo

const styles = StyleSheet.create({})