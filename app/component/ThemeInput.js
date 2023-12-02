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
  onBlur,
  label,
  secureTextEntry,
  autoFocus,
  maxLength,
  ariaValuemin
}) => {
  return (
    <TextInput
      onChange={onChange}
      onChangeText={onChangeText}
      value={value}
      label={label}
      maxLength={maxLength}
      autoFocus={autoFocus}
      style={[styles.input, style]}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      error={error}
      secureTextEntry={secureTextEntry}
      aria-valuemin={ariaValuemin}
      placeholderTextColor={'#000'}
      disabled={disabled}
      keyboardType={keyboardType}
      mode="flat"
    />
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth:1,
    borderWidth:0,
    width:'100%',
    fontFamily:'Lora-Regular',
    color:'#000'
  },
});
