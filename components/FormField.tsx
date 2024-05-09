import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TextContentType } from "@/types/types";

const FormField = ({
  control,
  label,
  name,
  placeholder,
  styles,
  textContentType,
}: {
  control: Control<any>;
  label: string;
  name: string;
  placeholder?: string;
  styles?: string;
  textContentType?: TextContentType;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className={`space-y-2 ${styles}`}>
      <Text className="text-base font-roboregular">{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="focus:border-2 w-full h-16 px-4 bg-gray rounded-2xl focus:border-secondary items-center flex-row">
            <TextInput
              placeholder={placeholder}
              className="flex-1 text-base font-roboregular"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType={textContentType}
              secureTextEntry={
                textContentType === "password" ? !showPassword : false
              }
            />
            {textContentType === "password" ? (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={
                    showPassword
                      ? require("../assets/icons/view.png")
                      : require("../assets/icons/hide.png")
                  }
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        name={name}
      />
    </View>
  );
};

export default FormField;
