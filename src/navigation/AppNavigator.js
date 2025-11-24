// Esse arquivo vai controlar as telas por empilhamento (que é o modo mais comum)

import { createStackNavigator } from '@react-navigation/stack';

import CharactersListScreen from '../screens/CharactersListScreen';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';

// Criando o objeto Stack, que controla as rotas (telas)
const Stack = createStackNavigator();


export default function AppNavigator() {
  return (
  
    <Stack.Navigator>

      {/*
        Tela principal (inicial)
      */}
      <Stack.Screen 
        name="CharactersList"
        component={CharactersListScreen}
        options={{ title: 'Rick and Morty - Personagens' }}
      />

      {/*
        Tela de detalhes do personagem, que será aberta quando o usuário tocar em um card
      */}
      <Stack.Screen 
        name="CharacterDetails"
        component={CharacterDetailsScreen}
        options={{ title: 'Detalhes do Personagem' }}
      />

    </Stack.Navigator>
  );
}
