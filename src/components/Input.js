// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';

// const Input = (props) => {
//   const onChangeText = (text) => {
//     props.onInputChanged(props.id, text);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           {...props}
//           placeholder={props.placeholder}
//           placeholderTextColor={props.placeholderTextColor}
//           style={styles.input}
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
//     marginBottom: 20, 
//   },
//   inputContainer: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     marginVertical: 16,
//   },
//   input: {
//     flex: 1,
//     color: 'white',
//     fontSize: 18,
//     paddingVertical: 10,
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
// Input.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = (props) => {
  const [error, setError] = useState('');

  const onChangeText = (text) => {
    props.onInputChanged(props.id, text);
  };

  const onBlur = () => {
    if (props.required && !props.value.trim()) {
      setError(`${props.placeholder} is required.`);
    } else if (props.id === 'email' && !isValidEmail(props.value.trim())) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex (change as per your requirement)
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={onChangeText}
          // onBlur={onBlur}
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    paddingVertical: 10,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Input;
