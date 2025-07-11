//Signout
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { Socket } from 'socket.io-client'
import { Ionicons } from "@expo/vector-icons";

type SignoutProps = {
    socket: Socket;
};

const Signout: React.FC<SignoutProps> = ({ socket }) => {
    const navigation = useNavigation();

    const handleSignout = async () => {
        await AsyncStorage.removeItem('userName');
        socket.emit('signout');
        navigation.navigate('Home' as never);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleSignout}>
            <Ionicons name="log-out-outline" size={24} color={'white'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default Signout;