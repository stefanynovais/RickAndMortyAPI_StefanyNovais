//esse arquivo vai msotrar a lista dos personagens 

import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, Image, 
  ActivityIndicator, TouchableOpacity, StyleSheet, TextInput
} from 'react-native';

export default function CharactersListScreen({ navigation }) {

  //guarda todos os personagens carregados até o momento
  const [characters, setCharacters] = useState([]);

  //controla quando está carregando dados da API
  const [loading, setLoading] = useState(true);

  //guarda a URL da próxima página enviada pela API (para paginação)
  const [nextPageUrl, setNextPageUrl] = useState("https://rickandmortyapi.com/api/character");

  //guarda o texto digitado no campo de busca
  const [searchText, setSearchText] = useState("");

  //impede várias chamadas simultâneas enquanto carrega nova página
  const [isFetchingMore, setIsFetchingMore] = useState(false);


  
   //função para buscar dados da API
  
  const fetchCharacters = (url, resetList = false) => {
    //se for busca, apaga os dados passados
    if (resetList) {
      setCharacters([]);
      setLoading(true);
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {

        //caso a API retorne erro ao buscar nome que não existe
        if (data.error) {
          setCharacters([]);
          setNextPageUrl(null);
          setLoading(false);
          return;
        }

        //adiciona os novos personagens à lista (concatenação)
        setCharacters(prev => resetList ? data.results : [...prev, ...data.results]);

        //atualiza a URL da próxima página
        setNextPageUrl(data.info.next);

        setLoading(false);
        setIsFetchingMore(false);
      })
      .catch(err => {
        console.log("Erro na API:", err);
        setLoading(false);
        setIsFetchingMore(false);
      });
  };


 
   //busca a primeira página de personagens
   
  useEffect(() => {
    fetchCharacters(nextPageUrl);
  }, []);


  //quando o usuário chegar ao fim da lista, já roda para a próxima página automaticamente
  const loadMore = () => {
    //se já estiver carregando ou não existir próxima página: não faz nada
    if (isFetchingMore || !nextPageUrl) return;

    setIsFetchingMore(true);
    fetchCharacters(nextPageUrl);
  };


  
    //lógica da busca: sempre que o texto mudar, chamamos a API com ?name=...; e também reinicia-se a lista (resetList=true)
   
  const handleSearch = (text) => {
    setSearchText(text);

    //se for campo vazio, volta à página 1 da API
    if (text.trim() === "") {
      fetchCharacters("https://rickandmortyapi.com/api/character", true);
      setNextPageUrl("https://rickandmortyapi.com/api/character");
      return;
    }

    //busca filtrada
    const url = `https://rickandmortyapi.com/api/character/?name=${text}`;
    fetchCharacters(url, true);
  };


  //tela de carregamento inicial
  if (loading && characters.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff66" />
        <Text style={{ color: "#00ff66" }}>Carregando personagens...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      {/*campo de busca que chama a API em tempo real*/}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar personagem..."
        placeholderTextColor="#9ae7c1"
        value={searchText}
        onChangeText={handleSearch}
      />

      {/*lista principal com paginação infinita*/}
      <FlatList 
        data={characters}
        keyExtractor={item => item.id.toString()}

        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate("CharacterDetailsScreen", { character: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>Status: {item.status}</Text>
              <Text style={styles.text}>Espécie: {item.species}</Text>
            </View>
          </TouchableOpacity>
        )}

        //chama paginação ao chegar no fim
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}

        //loading da paginação
        ListFooterComponent={
          isFetchingMore && (
            <ActivityIndicator size="small" color="#00ff66" />
          )
        }
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f14',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#1b1f25',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    color: '#00ff66',
    borderWidth: 1,
    borderColor: '#00ff66',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#16241d',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#00ff66",
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
    color: "#00ff66",
  },
  text: {
    color: "#d7ffe9"
  }
});
