import ArrayFormField from '@/components/ArrayFormField';
import CheckboxGroupField from '@/components/CheckboxGroupField';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { categories } from '@/constants/categories';
import { icons } from '@/constants/icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<any>({
    defaultValues: {
      title: '',
      description: '',
      portion: '',
      cookTime: '',
      ingredients: [{ ingredient: '' }],
      steps: [{ step: '' }],
      categories: {
        breakfast: false,
        lunch: false,
        dinner: false,
        dessert: false,
        snack: false,
        drinks: false,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        appetizer: false,
      },
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

  const categoriesOptions = categories.filter((category) =>
    Object.keys(getValues('categories')).includes(category.id)
  );

  const validateCategories = () => {
    const values = getValues('categories');
    const selectedOptions = Object.values(values).filter(Boolean).length;
    if (selectedOptions > 3) {
      setError('categories', {
        type: 'validate',
        message: 'You cannot select more than 3 options.',
      });
    } else {
      clearErrors('categories');
    }
  };

  const onSubmit = (data: any) => console.log(data);

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
              required: { value: true, message: 'This is a required field' },
            }}
            placeholder="Spaghetti Carbonara"
          />
          <FormField
            name="description"
            control={control}
            label="Description"
            styles="mt-4"
            rules={{
              required: { value: true, message: 'This is a required field' },
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
              required: { value: true, message: 'This is a required field' },
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
              required: { value: true, message: 'This is a required field' },
              maxLength: { value: 3, message: 'Maximun portion is for 999 people.' },
            }}
            placeholder="2 people"
            size="sm"
            styles="mt-8"
            keyboardType="numeric"
          />
          <ArrayFormField
            name="ingredients"
            label="Ingredients"
            control={control}
            rules={{
              required: { value: true, message: 'This is a required field' },
            }}
            placeholder="200g of sugar"
            styles="mt-8"
            fieldName="ingredient"
          />
          <ArrayFormField
            name="steps"
            label="Steps"
            control={control}
            rules={{
              required: { value: true, message: 'This is a required field' },
            }}
            placeholder="Preheat the oven to 180°C"
            styles="mt-8"
            fieldName="step"
          />
          <CheckboxGroupField
            control={control}
            groupName="categories"
            label="Categories"
            options={categoriesOptions}
            validate={validateCategories}
            helpText="Select up to 3 categories."
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit(onSubmit)}
            disabled={Boolean(!isValid || errors.categories)}
            loading={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
