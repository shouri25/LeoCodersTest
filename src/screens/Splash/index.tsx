import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react'
import { Button, Text, View } from 'react-native'
import { RootStackParamList } from '../../navigation/RootStack';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'SPLASH'>;

const Splash = ({navigation}:SplashProps)=> {

    const onPressSecond = useCallback(()=>{
        navigation.navigate('SECOND')
    },[])
    const onPressThird= useCallback(()=>{
        navigation.navigate('THIRD')

    },[])
    const onPressSignup= useCallback(()=>{
        navigation.navigate('SIGNUP')

    },[])
    return (
        <View style={{
            alignItems:'center',
            justifyContent:'center',
            flex:1
        }}>
            <Button onPress={onPressSecond} title='Second Screen'/>
            <Button onPress={onPressThird} title='Third Screen'/>
            <Button onPress={onPressSignup} title='Signup'/>
        </View>
    )
}
export default Splash;