# 🚀🛸 Rick and Morty App

Bem-vindo(a) ao Rick and Morty Explorer, um mini-app feito em React Native para explorar personagens do universo insano criado por Justin Roiland e Dan Harmon.

# 🌌 Parte 1 — Estrutura do Projeto

Este app é organizado em algumas seções principais:

## 📁 /src/screens/

Onde ficam as telas principais:

SplashScreen.js
Tela inicial com animação e pontos verdes brilhantes estilo partícula interdimensional.

CharactersListScreen.js
Lista todos os personagens da API Rick and Morty, em formato de cards.

CharacterDetailsScreen.js
Mostra os detalhes de um personagem (nome, status, espécie etc).

## 📁 /src/navigation/

Sistema de rotas usando createNativeStackNavigator.

AppNavigator.js
Controla a ordem das telas. A primeira tela mostrada é a Splash Screen.


# 🪐 Parte 2 — Tela de Listagem
## ⭐ Splash Screen Animada

Fundo com gradiente escuro espacial

Pontinhos verdes brilhantes inspirados no portal do Rick

Texto centralizado “Rick And Morty”

Timer automático que redireciona para a lista de personagens após 3s

## ⭐ Lista de Personagens

Consome a API oficial: https://rickandmortyapi.com/

Exibe cards com nome, espécie, imagem e status.

# 🪐 Parte 3 — Tela de Listagem
## ⭐ Tela de Detalhes

Exibe: 

Nome completo;

Status, Espécie, Gênero;

Localização de Origem (origin.name);

Localização Atual (location.name).

# 🪐 Desafios
1. Paginação Infinita: Implemente o recurso onEndReached do FlatList para carregar automaticamente a próxima página da API quando o usuário rolar até o final da lista (Dica: A API informa a URL da próxima página no objeto info.next).

2. Busca/Filtro: Adicione uma barra de pesquisa (TextInput) que filtre a lista de personagens em tempo real, usando o parâmetro name na requisição da API (ex: .../character/?name=rick).

3. Estilização Temática: Utilize as cores e o estilo visual da série "Rick and Morty" para deixar o app mais atraente

# 🔧 Tecnologias Utilizadas

React Native (Expo)

React Navigation (Stack Navigator)

Animated API (para efeitos)

Linear Gradient (expo-linear-gradient)

Fetch para consumo da API
