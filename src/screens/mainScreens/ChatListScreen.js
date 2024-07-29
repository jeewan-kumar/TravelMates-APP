

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TEMPORARY_CHAT_DATA = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    image: 'https://via.placeholder.com/60',
    lastMessageDate: '2024-07-21',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Looking forward to our meeting.',
    image: 'https://via.placeholder.com/60',
    lastMessageDate: '2024-07-20',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    lastMessage: 'Can you send me the files?',
    image: 'https://via.placeholder.com/60',
    lastMessageDate: '2024-07-19',
  },
  {
    id: '4',
    name: 'Bob Brown',
    lastMessage: 'Thanks for the help!',
    image: 'https://via.placeholder.com/60',
    lastMessageDate: '2024-07-18',
  },
  // Add more temporary data as needed
];

export default function ChatListScreen() {
  const [chatList, setChatList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Use the temporary data instead of fetching from API
    setChatList(TEMPORARY_CHAT_DATA);
  }, []);

  const onPressChat = (chat) => {
    navigation.navigate('ChatDetailScreen', { chatData: chat });
  };

  return (
    <View style={styles.container}>
     
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => onPressChat(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.chatImage}
            />
            <View style={styles.chatContent}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
              <Text style={styles.chatDate}>{item.lastMessageDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2f4f4f' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatLastMessage: {
    color: '#888',
  },
  chatDate: {
    fontSize: 12,
    color: '#aaa',
  },
});

// import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import UserChat from '../../components/UserChat'; // Import the UserChat component

// // Mock data
// const mockMatches = [
//   { id: '1', name: 'Alice', lastMessage: 'Hey there!' },
//   { id: '2', name: 'Bob', lastMessage: 'Looking forward to our trip!' },
//   { id: '3', name: 'Charlie', lastMessage: 'Can’t wait to meet you!' },
// ];

// const ChatScreen = () => {
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     // Simulate fetching matches with mock data
//     setMatches(mockMatches);
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <Text style={styles.header}>Your Matches</Text>
//         <View style={styles.matchesContainer}>
//           {matches.map((item) => (
//             <UserChat key={item.id} item={item} />
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 55,
//     padding: 12,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   matchesContainer: {
//     marginVertical: 12,
//   },
// });

// export default ChatScreen;
