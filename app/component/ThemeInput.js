import {StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';

const ThemeInput = ({
  onChange,
  onChangeText,
  style,
  numberOfLines,
  placeholder,
  value,
  error,
  keyboardType,
  disabled,
  onBlur
}) => {
  return (
    <TextInput
      onChange={onChange}
      onChangeText={onChangeText}
      value={value}
      style={[styles.input, style]}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      keyboardType={keyboardType}
      mode="outlined"
      onBlur={onBlur}
    />
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth:1,
    width:'100%'
  },
});
