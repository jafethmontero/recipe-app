import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { icons } from '@/constants/icons';
import * as ImagePicker from 'expo-image-picker';

const Create: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<any>({
    defaultValues: {
      title: '',
      description: '',
      portion: '',
      cookTime: '',
    },
    mode: 'onBlur',
  });
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="bg-snow h-full">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="mt-6 px-4">
          <Text className="text-2xl font-robobold pl-1">Post a recipe</Text>
          <FormField
            name="title"
            control={control}
            label="Recipe title"
            styles="mt-4"
            rules={{
              required: { value: true, message: 'Recipe title is required' },
            }}
            placeholder="Spaghetti Carbonara"
          />
          <FormField
            name="description"
            control={control}
            label="Description"
            styles="mt-4"
            rules={{
              required: { value: true, message: 'Description is required' },
            }}
            placeholder="A classic Italian pasta dish with eggs, cheese, bacon and black pepper..."
            multiline={true}
            inputStyles="h-32"
          />
          <View className="px-1">
            <Text className="text-base font-roboregular pl-2 pb-1 mt-4">Recipe photo</Text>
            <View className="bg-gray w-full h-60 justify-center items-center rounded-xl">
              <TouchableOpacity onPress={pickImage} className={`${image ? 'w-full h-full' : ''}`}>
                {image ? (
                  <Image source={{ uri: image }} className="w-full h-full rounded-xl" />
                ) : (
                  <Image source={icons.ADD_IMAGE} className="w-6 h-6" tintColor="#9da3af" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <FormField
            name="cookTime"
            label="Cooking time"
            control={control}
            rules={{
              required: { value: true, message: 'Cook time is required' },
              pattern: { value: /^(?=\s*\S).*(\d+h)?\s*(\d+min)?$/i, message: 'Invalid time format' },
            }}
            placeholder="1h 30min"
            size="sm"
            styles="mt-8"
          />
          <FormField
            name="portion"
            label="Portion"
            control={control}
            rules={{
              required: { value: true, message: 'Portion is required' },
              maxLength: { value: 3, message: 'Maximun portion is for 999 people.' },
            }}
            placeholder="2 people"
            size="sm"
            styles="mt-8"
            keyboardType="numeric"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
