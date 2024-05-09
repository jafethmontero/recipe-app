import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import {
  type Control,
  type RegisterOptions,
  type FieldValues,
  type FieldPath,
  type FieldErrors,
  Controller,
} from 'react-hook-form';
import { TextContentType } from '@/types/types';

interface FormFieldProps {
  control: Control<any>;
  label: string;
  name: string;
  placeholder?: string;
  styles?: string;
  textContentType?: TextContentType;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const getFieldError = (errors: FieldErrors<FieldValues>, name: string): string => {
  if (errors[name] && typeof errors[name]?.message === 'string') {
    return String(errors[name]?.message) || 'Field error';
  }
  return '';
};

const FormField: React.FC<FormFieldProps> = (props) => {
  const { control, label, name, placeholder, styles, textContentType, rules } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${styles}`}>
      <Text className="text-base font-roboregular">{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ formState: { errors }, field: { onChange, onBlur, value } }) => (
          <View>
            <View
              className={`${
                errors[name] ? 'border-red-500' : 'border-gray'
              } border-2 w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row`}
            >
              <TextInput
                placeholder={placeholder}
                className="flex-1 text-base font-roboregular"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                textContentType={textContentType}
                secureTextEntry={textContentType === 'password' ? !showPassword : false}
              />
              {textContentType === 'password' ? (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={
                      showPassword ? require('../assets/icons/view.png') : require('../assets/icons/hide.png')
                    }
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {errors[name] ? (
              <Text className="text-red-500 mt-1 pl-2">{getFieldError(errors, name)}</Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

export default FormField;
