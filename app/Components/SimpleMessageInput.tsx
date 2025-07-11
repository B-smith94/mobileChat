import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Button, Keyboard } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Socket } from "socket.io-client";

type MessageInputProps = {
    socket: Socket;
};

const MessageInput: React.FC<MessageInputProps> 