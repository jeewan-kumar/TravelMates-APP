
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ id, placeholder, placeholderTextColor, leftIcon, secureTextEntry, onInputChanged, errorText, style, rightIcon, ...props }) => {
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
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
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
  rightIcon: {
    position: 'absolute',
    right: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;


// import React from 'react';
// import { View, TextInput, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Input = ({ id, placeholder, placeholderTextColor, leftIcon, secureTextEntry, onInputChanged, errorText, style, rightIcon, ...props }) => {
//   const handleChange = (text) => {
//     onInputChanged(id, text);
//   };

//   return (
//     <View style={[styles.inputContainer, style]}>
//       {leftIcon && <Icon name={leftIcon} size={20} style={styles.icon} />}
//       <TextInput
//         style={styles.input}
//         placeholder={placeholder}
//         placeholderTextColor={placeholderTextColor}
//         secureTextEntry={secureTextEntry}
//         onChangeText={handleChange}
//         {...props}
//       />
//       {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
//       {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     color: 'white',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   icon: {
//     marginRight: 10,
//     color: 'white',
//   },
//   rightIcon: {
//     position: 'absolute',
//     right: 10,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default Input;