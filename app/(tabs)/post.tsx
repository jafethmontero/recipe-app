import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { icons } from '@/constants/icons';

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
    },
    mode: 'onBlur',
  });

  return (
    <SafeAreaView className="bg-snow h-full">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="mt-6 px-4">
          <Text className="text-2xl font-robobold pl-2">Post a recipe</Text>
          <FormField
            name="title"
            control={control}
            label="Recipe title"
            styles="mt-4"
            rules={{
              required: { value: true, message: 'Title is required' },
              maxLength: { value: 50, message: 'Max length = 50' },
              minLength: { value: 8, message: 'Min length = 8' },
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
              maxLength: { value: 100, message: 'Max length = 50' },
              minLength: { value: 8, message: 'Min length = 8' },
            }}
            placeholder="A classic Italian pasta dish with eggs, cheese, bacon and black pepper..."
            multiline={true}
            inputStyles="h-32"
          />
          <View className="px-1">
            <Text className="text-base font-roboregular pl-2 pb-1 mt-4">Recipe photo</Text>
            <View className="bg-gray w-full h-60 justify-center items-center rounded-xl">
              <TouchableOpacity>
                <Image source={icons.ADD_IMAGE} className="w-6 h-6" tintColor="#9da3af" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center mt-8">
            <Text className="text-base font-roboregular pl-2 flex-1">Portion</Text>
            <FormField
              name="portion"
              control={control}
              rules={{
                required: { value: true, message: 'Portion is required' },
                maxLength: { value: 3, message: 'Max is 999' },
              }}
              keyboardType="numeric"
              placeholder="2 people"
              inputStyles="w-[50vw]"
            />
          </View>
          <View className="flex-row items-center mt-4">
            <Text className="text-base font-roboregular pl-2 flex-1">Cooking time</Text>
            <FormField
              name="cookTime"
              control={control}
              rules={{
                required: { value: true, message: 'Cook time is required' },
                maxLength: { value: 50, message: 'Max length = 50' },
              }}
              placeholder="1h 30min"
              inputStyles="w-[50vw]"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
