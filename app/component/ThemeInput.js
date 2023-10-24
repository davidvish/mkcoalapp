import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const ThemeInput = ({
  onChange,
  onChangeText,
  style,
  numberOfLines,
  placeholder,
  value,
}) => {
  return (
    <TextInput
      onChange={onChange}
      onChangeText={onChangeText}
      value={value}
      style={[styles.input, style]}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      mode="outlined"
    />
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f5f5f5',
  },
});
