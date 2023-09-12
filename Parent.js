
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
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                </Stack.Navigator>
                {isAuthenticated && <Footer />}
            </NavigationContainer>
    )
}

export default Parent