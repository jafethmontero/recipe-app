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
import { icons } from '@/constants/icons';

interface FormFieldProps {
  control: Control<any>;
  label?: string;
  name: string;
  placeholder?: string;
  styles?: string;
  textContentType?: TextContentType;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  inputStyles?: string;
}

const getFieldError = (errors: FieldErrors<FieldValues>, name: string): string => {
  if (errors[name] && typeof errors[name]?.message === 'string') {
    return String(errors[name]?.message) || 'Field error';
  }
  return '';
};

const FormField: React.FC<FormFieldProps> = (props) => {
  const { control, label, name, placeholder, styles, textContentType, rules, keyboardType, inputStyles } =
    props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${styles}`}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ formState: { errors }, field: { onChange, onBlur, value } }) => (
          <View>
            {label ? <Text className="text-base font-roboregular pl-2 pb-1">{label}</Text> : null}
            <View
              className={`${
                errors[name] ? 'border-red-500' : 'border-gray'
              } border w-full h-14 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row ${inputStyles}`}
            >
              <TextInput
                placeholder={placeholder}
                className="flex-1 text-base font-roboregular h-full"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                textContentType={textContentType}
                secureTextEntry={textContentType === 'password' ? !showPassword : false}
                autoCapitalize="none"
                keyboardType={keyboardType}
                {...props}
              />
              {textContentType === 'password' ? (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={showPassword ? icons.EYE_VIEW : icons.EYE_HIDE}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {errors[name] ? (
              <Text className="text-red-500 mt-2 pl-2">{getFieldError(errors, name)}</Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

export default FormField;
