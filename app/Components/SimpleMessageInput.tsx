import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Button, Keyboard } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Socket } from "socket.io-client";

type MessageInputProps = {
    socket: Socket;
};

const MessageInput: React.FC<MessageInputProps> = ({ socket }) => {
    const [messageText, setMessageText] = useState('');
    const [userId, setUserID] = useState<string | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('userName').then(name => setUserID(name));
    }, []);

    const sendMessage = () => {
        if (!userId || !messageText.trim()) {
            alert('Please enter a valid message.');
            return;
        }
        try {
            socket.emit('message', { userId, text: messageText });
            setMessageText('');
            Keyboard.dismiss(); // dismiss keyboard after send
        } catch (error) {
            alert(`Could not send message: ${error}`);
            console.log('An error occurred:', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Type your message</Text>
            <TextInput
                style={styles.input}
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Type here..."
                autoCorrect={false}
                autoComplete="off"
                returnKeyType="send"
                onSubmitEditing={sendMessage} // called when user presses Enter/Send on keyboard
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    label: {
        color: 'grey',
        marginBottom: 8,
        fontSize: 14,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 12,
        borderRadius: 4
    },
});

export default MessageInput;