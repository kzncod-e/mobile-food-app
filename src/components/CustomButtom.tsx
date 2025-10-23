/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { CustomButtonProps } from 'type';
import { cn } from '@/utils/cn';

const CustomButton = ({
  onPress,
  title = 'Click me',
  style,
  textStyle,
  leftIcon,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn('custom-btn', style)}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
