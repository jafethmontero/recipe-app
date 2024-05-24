import ArrayFormField from '@/components/ArrayFormField';
import CheckboxGroupField from '@/components/CheckboxGroupField';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { categories } from '@/constants/categories';
import { icons } from '@/constants/icons';
import { auth, db, storage } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { useStoreContext } from '@/store/StoreProvider';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
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
    reset,
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
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { setRefreshHomeTab } = useStoreContext();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const [createRecipeCallback, recipeLoading, recipeError] = useFirebaseApiCallback(
    async (data) => {
      const { title, description, portion, cookTime, ingredients, steps, categories } = data;
      const selectedCategories = Object.entries(categories)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

      const recipeRef = await addDoc(collection(db, 'recipes'), {
        title,
        description,
        portion,
        cookTime,
        ingredients,
        steps,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: auth.currentUser?.uid,
        categories: selectedCategories,
      });
      let userDocRef;
      if (auth?.currentUser) {
        userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { recipes: arrayUnion(recipeRef.id) });
      }
      const imagesRef = ref(storage, `recipes/${recipeRef.id}`);
      if (image?.uri) {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image.uri, true);
          xhr.send(null);
        });
        await uploadBytes(imagesRef, blob);
      }
      const downloadURL = await getDownloadURL(imagesRef);
      await updateDoc(recipeRef, { imageURL: downloadURL });
      reset();
      setImage(null);
      setRefreshHomeTab((count) => count + 1);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
      router.push('/home');
    },
    [auth]
  );

  const pickImage = async () => {
    setImageLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setImageLoading(false);
    } else {
      setImageLoading(false);
    }
  };

  const categoriesOptions = categories.filter((category: any) =>
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

  return (
    <SafeAreaView className="bg-snow h-full">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="mt-6 px-4">
          <Text className="text-2xl font-robobold pl-1">Create a recipe</Text>
          <FormField
            name="title"
            control={control}
            label="Recipe title"
            styles="mt-4"
            rules={{
              required: { value: true, message: 'This is a required field' },
            }}
            placeholder="Spaghetti Carbonara"
            autoFocus={true}
            textInputRef={textInputRef}
          />
          <FormField
            name="description"
            control={control}
            label="Description"
            styles="mt-4"
            placeholder="A classic Italian pasta dish with eggs, cheese, bacon and black pepper..."
            multiline={true}
            inputStyles="h-32"
          />
          <View className="px-1">
            <Text className="text-base font-roboregular pl-2 pb-1 mt-4">Recipe photo</Text>
            <View className="bg-gray w-full h-60 justify-center items-center rounded-xl">
              <TouchableOpacity
                onPress={pickImage}
                className={`${image && !imageLoading ? 'w-full h-full' : ''}`}
              >
                {imageLoading ? (
                  <ActivityIndicator size="small" color="#F9A826" />
                ) : !imageLoading && image?.uri ? (
                  <Image source={{ uri: image.uri }} className="w-full h-full rounded-xl" />
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
            title="Post recipe"
            containerStyles="w-full mt-7"
            handlePress={handleSubmit(createRecipeCallback)}
            disabled={Boolean(!isValid || errors.categories)}
            loading={recipeLoading}
          />
          {recipeError?.message ? (
            <Text className="text-red-500 text-sm mt-2">{recipeError.message}</Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
