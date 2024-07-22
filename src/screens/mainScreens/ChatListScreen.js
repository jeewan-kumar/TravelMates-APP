// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const chatUrl = "http://192.168.33.157:5164/Skillup_Chat"; // Replace with your API endpoint

// export default function ChatListScreen() {
//   const [chatList, setChatList] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     getChatList();
//   }, []);

//   const getChatList = async () => {
//     try {
//       const response = await axios.get(chatUrl);
//       const result = response.data.data.map((item) => ({
//         id: item.id,
//         name: item.attributes.name,
//         lastMessage: item.attributes.lastMessage,
//         image: item.attributes.image.data.attributes.url,
//         lastMessageDate: item.attributes.lastMessageDate,
//       }));
//       setChatList(result);
//     } catch (error) {
//       console.error('Error fetching chat list:', error);
//     }
//   };

//   const onPressChat = (chat) => {
//     navigation.navigate('ChatDetail', { chatData: chat });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chats</Text>
//       <FlatList
//         data={chatList}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.chatItem}
//             onPress={() => onPressChat(item)}
//           >
//             <Image
//               source={{ uri: item.image }}
//               style={styles.chatImage}
//             />
//             <View style={styles.chatContent}>
//               <Text style={styles.chatName}>{item.name}</Text>
//               <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
//               <Text style={styles.chatDate}>{item.lastMessageDate}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   chatItem: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 2,
//   },
//   chatImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     margin: 10,
//   },
//   chatContent: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   chatName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   chatLastMessage: {
//     color: '#888',
//   },
//   chatDate: {
//     fontSize: 12,
//     color: '#aaa',
//   },
// });

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
      <Text style={styles.title}>Chats</Text>
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
    backgroundColor: '#f5f5f5',
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
