import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

const CustomButton = ({onPress,title}:ButtonProps) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        padding:12,
        borderRadius:24,
        backgroundColor:'green',
        marginVertical: 8
    },
    title: {
        color:'#FFF',
        fontSize:14,
        fontWeight:'500'
    }
})
export default CustomButton;