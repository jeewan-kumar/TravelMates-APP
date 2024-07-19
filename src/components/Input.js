
// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';

// const Input = (props) => {
//   const onChangeText = (text) => {
//     props.onInputChanged(props.id, text);
//   };

//   return (
//     <View style={[styles.container]}>
//       <View style={[styles.inputContainer]}>
//         <TextInput
//           {...props}
//           placeholder={props.placeholder}
//           placeholderTextColor={props.placeholderTextColor}
//           style={[styles.input]}
//           autoCapitalize="none"
//           onChangeText={onChangeText}
//         />
//       </View>
//       {props.errorText && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{props.errorText}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 0,
//   },
//   inputContainer: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     marginVertical: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//     borderRadius: 12,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//   },
//   input: {
//     flex: 1,
//     color: 'white',
//     fontSize: 18,
//     marginBottom:-15,
//   },
//   errorContainer: {
//     marginVertical: 4,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//   },
// });

// export default Input;

// components/Input.js

import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ id, placeholder, placeholderTextColor, leftIcon, secureTextEntry, onInputChanged, errorText, style, ...props }) => {
  const handleChange = (text) => {
    onInputChanged(id, text);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      {leftIcon && <Icon name={leftIcon} size={20} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        {...props}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;


// import React from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Input = ({ leftIcon, ...props }) => (
//   <View style={styles.container}>
//     {leftIcon && <Icon name={leftIcon} size={30} color="white" style={styles.icon} />}
//     <TextInput style={styles.input} {...props} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: 'white',
//     marginBottom: 20,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     height: 40,
//     color: 'white',
//     flex: 1,
//   },
// });

// export default Input;
