// Esse arquivo vai controlar as telas por empilhamento (que é o modo mais comum)

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CharactersListScreen from '../screens/CharactersListScreen';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';
import SplashScreen from '../screens/SplashScreen';

// Criando o objeto Stack, que controla as rotas (telas)
const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
  
  
 <Stack.Navigator
      initialRouteName="SplashScreen" 
      screenOptions={{
        headerShown: false,      
      }}
    >

      {/* Tela Splash */}
      <Stack.Screen 
        name="SplashScreen"
        component={SplashScreen}
      />
      {/*
        Tela principal (inicial)
      */}
      <Stack.Screen 
        name="CharactersListScreen"
        component={CharactersListScreen}
        options={{ title: 'Rick and Morty - Personagens' }}
      />

      {/*
        Tela de detalhes do personagem, que será aberta quando o usuário tocar em um card
      */}
      <Stack.Screen 
        name="CharacterDetailsScreen"
        component={CharacterDetailsScreen}
        options={{ title: 'Detalhes do Personagem' }}
      />

    </Stack.Navigator>
  );
}
