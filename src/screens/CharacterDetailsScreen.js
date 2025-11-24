//Esse arquivo vai ter as informações específicas de cada personagem 

import { View, Text, Image, StyleSheet } from 'react-native';

export default function CharacterDetailsScreen({ route }) {

  //pega o personagem enviado pela tela anterior
  const { character } = route.params;

  return (
    <View style={styles.container}>

      {/* Imagem do personagem */}
      <Image source={{ uri: character.image }} style={styles.image} />

      {/* Informações dele */}
      <Text style={styles.name}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Espécie: {character.species}</Text>
      <Text>Origem: {character.origin.name}</Text>
      <Text>Local atual: {character.location.name}</Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
  }
});