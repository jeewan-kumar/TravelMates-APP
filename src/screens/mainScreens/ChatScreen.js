import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock messages for demo
  const initialMessages = [
    { id: '1', sender: 'Alice', text: "Hello! How are you?" },
    { id: '2', sender: 'User', text: "Hi Alice! I'm good, thanks." },
  ];

  useEffect(() => {
    // Fetch messages from API or AsyncStorage
    setMessages(initialMessages);
  }, []);

  const sendMessage = () => {
    // Send message logic
    const message = { id: String(messages.length + 1), sender: 'User', text: newMessage };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const renderItem = ({ item }) => (
    <View style={item.sender === 'User' ? styles.userMessage : styles.otherMessage}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  otherMessage: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
});

export default ChatScreen;


// import React, { useState } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   const onSend = (newMessages) => {
//     setMessages(GiftedChat.append(messages, newMessages));
//   };

//   return <GiftedChat messages={messages} onSend={newMessages => onSend(newMessages)} user={{ _id: 1 }} />;
// };

// export default ChatScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
// import firebase from 'firebase/app';
// import 'firebase/database';

// const firebaseConfig = {
//   // Your Firebase configuration
//   // Initialize Firebase app with Realtime Database
// };

// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// const ChatScreen = ({ route }) => {
//   const { userId, recipientId, recipientName } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const chatRef = database.ref(`chats/${userId}/${recipientId}`);

//     chatRef.on('value', snapshot => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const messagesArray = Object.keys(data).map(key => ({
//           id: key,
//           sender: data[key].sender,
//           text: data[key].text,
//         }));
//         setMessages(messagesArray);
//       }
//     });

//     return () => chatRef.off('value');
//   }, [userId, recipientId]);

//   const sendMessage = () => {
//     if (newMessage.trim() !== '') {
//       const chatRef = database.ref(`chats/${userId}/${recipientId}`).push();
//       chatRef.set({
//         sender: userId,
//         text: newMessage,
//       });
//       setNewMessage('');
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={item.sender === userId ? styles.userMessage : styles.otherMessage}>
//       <Text>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chat with {recipientName}</Text>
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
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default ChatScreen;
