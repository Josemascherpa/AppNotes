import { Text, View } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { verifyRegister } from './actions/register';
import { User } from './domain/user';

const queryClient = new QueryClient();

const NotesComponent = () => {
  const user: User = {
    name: "nacho",
    email: "nachito21@gma2il.com",
    password: "1234",
  };

  const { isLoading, data } = useQuery({
    queryKey: ['register'],
    queryFn: () => verifyRegister({ user }),
    staleTime: 1000 * 60 * 15, // cierto tiempo para mantener en cache 
    refetchInterval: 1000 * 60 * 15, // y volver a hacer la peticion
  });

  if (isLoading) {
    return <Text>Cargando...</Text>; // Muestra un texto de carga mientras se espera la respuesta
  }

  return (
    <View>
      <Text>Hola {JSON.stringify(data)}</Text>
    </View>
  );
};

export const AppNotes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesComponent />
    </QueryClientProvider>
  );
};
