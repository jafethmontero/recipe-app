import { icons } from '@/constants/icons';
import React from 'react';
import { Controller, type Control } from 'react-hook-form';
import { Text, View } from 'react-native';
import Checkbox from './Checkbox';

interface FormFieldProps {
  control: Control<any>;
  label?: string;
  groupName: string;
  styles?: string;
  options: any[];
  validate: () => void;
  helpText?: string;
}

const CheckboxGroupField: React.FC<FormFieldProps> = (props) => {
  const { control, label, groupName, styles, options, validate, helpText } = props;

  return (
    <View className={`${styles}`}>
      <Text className="font-roboregular text-base mt-4 ml-2">{label}</Text>
      <Text className="font-robothin text-sm pl-2 mb-2">{helpText}</Text>
      <View className="flex-row flex-wrap">
        {options.map((option) => (
          <Controller
            key={option.id}
            control={control}
            name={`${groupName}.${option.id}`}
            render={({ field: { onChange, value }, formState: { isValid } }) => (
              <View className="pl-4 w-1/2">
                <Checkbox
                  label={option.label}
                  value={value}
                  onValueChange={(newValue) => {
                    onChange(newValue);
                    validate();
                  }}
                  icon={icons[option.iconName as keyof typeof icons]}
                  disabled={false}
                />
              </View>
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default CheckboxGroupField;
