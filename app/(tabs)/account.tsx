import CustomButton from '@/components/CustomButton';
import { auth } from '@/firebaseConfig';
import { useFirebaseApiCallback } from '@/hooks/useFirebaseApiCallback';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account: React.FC = () => {
  const [signOutCallback, signOutPending, signOutError] = useFirebaseApiCallback(async () => {
    await signOut(auth);
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
      {signOutError && <Text>Error: {signOutError.message}</Text>}
    </SafeAreaView>
  );
};

export default Account;
