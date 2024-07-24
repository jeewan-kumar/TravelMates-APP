import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Pressable,
  } from 'react-native';
  import React, {useState, useLayoutEffect, useEffect} from 'react';
  import Entypo from 'react-native-vector-icons/Entypo';
  import Feather from 'react-native-vector-icons/Feather';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import axios from 'axios';
  
  const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
  
    const sendMessage = async (senderId, receiverId) => {
      // Assuming you have set up a socket connection elsewhere
      socket.emit('sendMessage', { senderId, receiverId, message });
  
      setMessage('');
  
      // Call the fetchMessages() function to update the UI
      setTimeout(() => {
        fetchMessages();
      }, 200);
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>{route?.params?.name}</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </View>
        ),
      });
    }, []);
  
    const fetchMessages = async () => {
      try {
        const { senderId, receiverId } = route?.params;
  
        const response = await axios.get('http://localhost:3000/messages', {
          params: { senderId, receiverId },
        });
  
        setMessages(response.data);
      } catch (error) {
        console.log('Error fetching the messages', error);
      }
    };
  
    useEffect(() => {
      fetchMessages();
    }, []);
  
    const formatTime = (time) => {
      const options = { hour: 'numeric', minute: 'numeric' };
      return new Date(time).toLocaleString('en-US', options);
    };
  
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((item, index) => (
            <Pressable
              key={index}
              style={[
                item?.senderId === route?.params?.senderId ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              <Text style={styles.messageText}>{item?.message}</Text>
              <Text style={styles.timestamp}>{formatTime(item?.timestamp)}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <Entypo name="emoji-happy" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            placeholder="Type your message..."
          />
          <View style={styles.iconsContainer}>
            <Entypo name="camera" size={24} color="gray" />
            <Feather name="mic" size={24} color="gray" />
          </View>
          <Pressable
            onPress={() => sendMessage(route?.params?.senderId, route?.params?.receiverId)}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default ChatRoom;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    messagesContainer: {
      flexGrow: 1,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#662d91',
      padding: 8,
      maxWidth: '60%',
      borderRadius: 7,
      margin: 10,
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#452c63',
      padding: 8,
      borderRadius: 7,
      margin: 10,
      maxWidth: '60%',
    },
    messageText: {
      fontSize: 15,
      color: 'white',
      fontWeight: '500',
    },
    timestamp: {
      fontSize: 9,
      textAlign: 'right',
      color: '#F0F0F0',
      marginTop: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#dddddd',
      marginBottom: 30,
    },
    icon: {
      marginRight: 7,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#dddddd',
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    sendButton: {
      backgroundColor: '#662d91',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    sendButtonText: {
      textAlign: 'center',
      color: 'white',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  });
  