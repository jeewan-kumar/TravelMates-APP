import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const GroupTravelScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  const addMember = () => {
    if (newMember.trim() !== '') {
      setGroupMembers([...groupMembers, newMember]);
      setNewMember('');
    }
  };

  const removeMember = (member) => {
    const updatedMembers = groupMembers.filter(m => m !== member);
    setGroupMembers(updatedMembers);
  };

  const createGroup = () => {
    // Logic to create the group and navigate to group details screen
    // Example: API call or saving data
    console.log(`Group Name: ${groupName}`);
    console.log('Group Members:', groupMembers);
    // Navigate to group details screen or another relevant screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group Travel</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group Name"
      />
      <View style={styles.membersContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          value={newMember}
          onChangeText={setNewMember}
          placeholder="Add Member"
        />
        <Button title="Add" onPress={addMember} />
      </View>
      <FlatList
        data={groupMembers}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => removeMember(item)} />
          </View>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        style={{ marginTop: 10 }}
      />
      <Button title="Create Group" onPress={createGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default GroupTravelScreen;
