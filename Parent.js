
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Login from './screens/Login';
import Register from './screens/Register';
import Footer from './components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './components/action/userAction';
import Loader from './components/Layout/Loader';
import Profile from './screens/Profile';
import ProductDetails from './screens/ProductDetails';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const Parent = () => {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const { loading, isAuthenticated } = useSelector((state) => state.user);

    return (
        loading ? <Loader />
            :
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' options={{ headerShown: false }} >
                    <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />

                    <Stack.Screen name='productdetails' component={ProductDetails} options={{ headerShown: false }} />
                    <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                </Stack.Navigator>
                <Toast position='top' />
                {isAuthenticated && <Footer />}
            </NavigationContainer>
    )
}

export default Parent