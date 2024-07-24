// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

// const ChatScreen = ({ navigation }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   // Mock messages for demo
//   const initialMessages = [
//     { id: '1', sender: 'Alice', text: "Hello! How are you?" },
//     { id: '2', sender: 'User', text: "Hi Alice! I'm good, thanks." },
//   ];

//   useEffect(() => {
//     // Fetch messages from API or AsyncStorage
//     setMessages(initialMessages);
//   }, []);

//   const sendMessage = () => {
//     // Send message logic
//     const message = { id: String(messages.length + 1), sender: 'User', text: newMessage };
//     setMessages([...messages, message]);
//     setNewMessage('');
//   };

//   const renderItem = ({ item }) => (
//     <View style={item.sender === 'User' ? styles.userMessage : styles.otherMessage}>
//       <Text>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         style={styles.messagesContainer}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type your message..."
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   messagesContainer: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 5,
//     maxWidth: '80%',
//   },
//   otherMessage: {
//     backgroundColor: '#EAEAEA',
//     alignSelf: 'flex-start',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 5,
//     maxWidth: '80%',
//   },
// });

// export default ChatScreen;

