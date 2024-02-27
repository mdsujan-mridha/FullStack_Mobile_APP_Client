
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
import AdminPanel from './components/AdminPanel/AdminPanel';
import Cart from './components/Cart/Cart';
import Collection from './screens/Collection';
import NewDonation from './screens/NewDonation';
import UpdatePassword from './screens/UpdatePassword';
import UpdateProfile from './screens/UpdateProfile';
import UpdateTodo from './screens/UpdateTodo';
import CameraComponent from './screens/CameraComponent';
import Chat from './screens/Chat';
import UpdateProfilePic from './screens/UpdateProfilePic';


const Stack = createNativeStackNavigator();

export default function Parent() {

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
                    <Stack.Screen name='cart' component={Cart} options={{ headerShown: false }} />
                    <Stack.Screen name='productdetails' component={ProductDetails} options={{ headerShown: false }} />
                    <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name='collection' component={Collection} options={{ headerShown: false }} />
                    <Stack.Screen name='updatecollection' component={UpdateTodo} options={{ headerShown: false }} />
                    <Stack.Screen name='donation' component={NewDonation} options={{ headerShown: false }} />
                    <Stack.Screen name='updatepassword' component={UpdatePassword} options={{ headerShown: false }} />
                    <Stack.Screen name='updateprofile' component={UpdateProfile} options={{ headerShown: false }} />
                    <Stack.Screen name='camera' component={CameraComponent} options={{ headerShown: false }} />
                    <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name='updateprofilepic' component={UpdateProfilePic} options={{ headerShown: false }} />

                    {/* admin panel  */}
                    < Stack.Screen name='adminpanel' component={AdminPanel} options={{ headerShown: false }} />

                </Stack.Navigator>
                <Toast position='top' />
                {isAuthenticated && <Footer />}
            </NavigationContainer>
    )
}

