import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
     // Esse NavigationContainer envolve toda a navegação do app
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
