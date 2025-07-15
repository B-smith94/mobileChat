import React, { useState, useEffect } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, SafeAreaView, 
    ScrollView 
} from 'react-native';
import ChatProvider from '../Components/SimpleChatBody';
import MessageInput from '../Components/SimpleMessageInput';
import Signout from '../Components/Signout';
import { Socket } from 'socket.io-client';

type ChatPageProps = {
    socket: Socket;
};

const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {
    const [filter, setFilter] = useState<string>("");

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={80}
            >
                <View style={styles.topBar}>
                    <Signout socket={socket} />
                </View>

                <View style={styles.filterInputWrapper}>
                    <TextInput
                        placeholder="Filter by username"
                        value={filter}
                        onChangeText={setFilter}
                        style={styles.filterInput}
                    />
                </View>

                <ScrollView contentContainerStyle={styles.chatBody}>
                    <ChatProvider socket={socket} filter={filter} />
                </ScrollView>

                <MessageInput socket={socket} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
    },
    topBar: {
        padding: 12,
        alignItems: "flex-start",
    },
    filterInputWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    filterInput: {
        height: 40,
        borderColor: "@ccc",
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    chatBody: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        flexGrow: 1,
    },
});

export default ChatPage;