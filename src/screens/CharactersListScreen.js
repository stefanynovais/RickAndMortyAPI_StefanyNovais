//Esse arquivo é a tela que mostra a lista dos personagens 

import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, Image, 
  ActivityIndicator, TouchableOpacity, StyleSheet 
} from 'react-native';

export default function CharactersListScreen({ navigation }) {

  // Estado que guarda os personagens da API
  const [characters, setCharacters] = useState([]);

  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);

  //useEffect faz rodar apenas 1 vez (ao abrir a tela)
  useEffect(() => {

    //Buscando os personagens da API Rick and Morty
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json()) //transforma resposta em JSON
      .then(data => {

        // 'results' é o array com os personagens
        setCharacters(data.results);

        // Desativa o loading
        setLoading(false);
      })
      .catch(error => {
        console.log("Erro ao buscar API:", error);

        // Mesmo com erro, tira-se o loading
        setLoading(false);
      });

  }, []); //array vazio = roda apenas uma vez

  //enquanto estiver carregando, mostra indicador
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text>Carregando personagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <FlatList 
        data={characters} //lista de dados
        keyExtractor={(item) => item.id.toString()} //chave única de cada item

        //card clicável
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}

            //navegando para a tela de detalhes
            //enviando o personagem como parâmetro
            onPress={() => navigation.navigate("CharacterDetails", { character: item })}
          >

            {/* Imagem do personagem */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Informações básicas */}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Espécie: {item.species}</Text>
            </View>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row', 
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});