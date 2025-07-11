import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Socket } from 'socket.io-client';

type ChatProviderProps = {
    socket: Socket;
    filter: string;
};

type Message = {
    text: string;
    userId: string;
};

const ChatProvider: React.FC<ChatProviderProps> = ({ socket, filter }) =>{
    const [messages, setMessages] = useState<Message[]>([]);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('userName').then(name => setUserID(name));
    }, []);

    useEffect(() => {
        const handleMessage = (message: Message) => {
            try {
                setMessages(prev => [...prev, message]);
            } catch (error) {
                console.error("An error occurred when receiving messages:", error);
            }
        };
        socket.on('message', handleMessage);
        return () => {
            socket.off('message', handleMessage);
         }; // Clean up
    }, [socket]);

    const filteredMessages = filter ? messages.filter(msg =>
        msg.userId.toLowerCase().includes(filter.toLowerCase())
    )
    : messages;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat Room</Text>
            <Text style={styles.subtitle}>Logged in as: {userID}</Text>
            <ScrollView style={styles.scrollArea}>
                {filteredMessages.map((message, index) => {
                    const currentDate = new Date();
                    const isCurrentUser = message.userId === userID;
                    return (
                        <View
                         key={index}
                         style={[
                            styles.messageCard,
                            isCurrentUser ? styles.alignLeft : styles.alignRight,
                         ]}
                        >
                            <Text style={[styles.messageText, {color: isCurrentUser ? 'blue' : 'green' }]}>
                                {message.userId} - {message.text}
                            </Text>
                            <Text style={styles.timestamp}>
                                posted at{' '}
                                {currentDate.toLocaleString([], {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 10,
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    scrollArea: {
        marginTop: 10,
    },
    messageCard: {
        backgroundColor: "#fff",
        borderRadius: 8, 
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    alignLeft: {
        alignSelf: 'flex-start',
    },
    alignRight: {
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 14,
    },
    timestamp: {
        fontSize: 10,
        marginTop: 5,
        color: '#555'
    },
});

export default ChatProvider;