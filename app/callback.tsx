import colors from '@/services/colors';
import { useLogto } from '@logto/rn';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function CallbackScreen() {
  const { client } = useLogto();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const url = await Linking.getInitialURL();

        console.log('[Callback] URL recebida:', url);

        if (url) {
          // Use the client directly for callback handling
          await client.handleSignInCallback(url);

          console.log('[Callback] Login finalizado com sucesso');

          router.replace('/');
        } else {
          console.log('[Callback] Nenhuma URL encontrada');
          // If no URL, go back to index to let it decide navigation
          router.replace('/');
        }
      } catch (error) {
        console.error('[Callback] Erro:', error);
        // On error, go back to index
        router.replace('/');
      }
    };

    run();
  }, [client, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
      }}
    >
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>
  );
}