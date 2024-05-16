import { icons } from '@/constants/icons';
import { TextContentType } from '@/types/types';
import React from 'react';
import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  size?: 'sm' | 'md' | 'lg';
  fieldName: string;
}

const getFieldError = (errors: FieldErrors<FieldValues>, name: string): string => {
  if (errors[name] && typeof errors[name]?.message === 'string') {
    return String(errors[name]?.message) || 'Field error';
  }
  return '';
};

const ArrayFormField: React.FC<FormFieldProps> = (props) => {
  const {
    control,
    label,
    name,
    placeholder,
    styles,
    textContentType,
    rules,
    keyboardType,
    inputStyles,
    size = 'lg',
    fieldName,
  } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <View className={`space-y-2 ${styles}`}>
      {fields.map((field, index) => (
        <Controller
          control={control}
          rules={rules}
          key={field.id}
          name={`${name}[${index}].${fieldName}`}
          render={({ formState: { errors }, field: { onChange, onBlur, value } }) => (
            <View>
              {index === 0 ? <Text className="text-base font-roboregular pl-2 pb-1 ">{label}</Text> : null}
              <View
                className={`${errors[name] ? 'border-red-500' : 'border-gray'}
            border w-full h-14 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row mb-2
            ${inputStyles} ${size === 'sm' ? 'w-[50vw]' : ''}`}
              >
                <TextInput
                  placeholder={placeholder}
                  className="flex-1 text-base font-roboregular h-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType={textContentType}
                  autoCapitalize="none"
                  keyboardType={keyboardType}
                  {...props}
                />
                {index !== 0 ? (
                  <TouchableOpacity key={field.id} onPress={() => remove(index)}>
                    <Image
                      source={icons.MINUS}
                      className="w-5 h-5 mr-2"
                      resizeMode="contain"
                      tintColor="#ef4444"
                    />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity onPress={() => append({ [fieldName]: '' })} disabled={!value}>
                  <Image
                    source={icons.PLUS}
                    className="w-5 h-5"
                    resizeMode="contain"
                    tintColor={!value ? '#d1d5db' : '#F9A826'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ))}
    </View>
  );
};

export default ArrayFormField;
