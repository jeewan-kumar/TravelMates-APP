import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = (props) => {
    const isLoading = props.isLoading || false;

    return (
        <TouchableOpacity
            style={{ ...styles.btn, ...props.style }}
            onPress={props.onPress}
            disabled={isLoading}
        >
            {
                isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.btnText}>
                        {props.title}
                    </Text>
                )
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', // Use percentage to make the button responsive
        alignSelf: 'center', // Center the button horizontally
        marginVertical: 10, // Add some vertical margin for spacing
    },
    btnText: {
        color: 'white',
        fontSize: 16,
    }
})
