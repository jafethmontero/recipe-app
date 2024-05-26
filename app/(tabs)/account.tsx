import CustomButton from '@/components/CustomButton';
import { auth } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Account: React.FC = () => {
  const [signOutCallback, signOutPending] = useFirebaseApiCallback(async () => {
    await signOut(auth);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully signed out.',
    });
    router.push('/sign-in');
  }, [auth]);

  return (
    <SafeAreaView>
      <Text>Account</Text>
      <CustomButton
        title="Sign Out"
        handlePress={() => signOutCallback()}
        disabled={signOutPending}
        loading={signOutPending}
      />
    </SafeAreaView>
  );
};

export default Account;
