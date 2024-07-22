import React from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const ChatDetailScreen = ({ route }) => {
  const { chatData } = route.params;

  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{chatData.name}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <Text>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#ddd',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#cfe9ff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatDetailScreen;
