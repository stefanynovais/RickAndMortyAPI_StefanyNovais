//Esse arquivo vai ter as informações específicas de cada personagem 

import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

export default function CharacterDetailsScreen({ route }) {

  //pega o personagem enviado pela tela anterior
  const { character } = route.params;


  //cria várias partículas em posições aleatórias com opacidade animada
  const particles = Array.from({ length: 18 }).map(() => ({
    opacity: useRef(new Animated.Value(Math.random())).current,
    top: Math.random() * height,
    left: Math.random() * width,
  }));

  useEffect(() => {

    //animação de cada pontinho piscando
    particles.forEach(p => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(p.opacity, {
            toValue: 0.1,
            duration: 800 + Math.random() * 900,
            useNativeDriver: true,
          }),
          Animated.timing(p.opacity, {
            toValue: 1,
            duration: 800 + Math.random() * 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

  }, []);

  return (
    <LinearGradient
      colors={['#050505ff', '#0a0a0aff']}
      style={styles.container}
    >

      {/* partículas verdes brilhantes */}
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            { top: p.top, left: p.left, opacity: p.opacity }
          ]}
        />
      ))}

      {/* Imagem do personagem */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>

      {/* Informações mais específicas dele */}
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Status: {character.status}</Text>
      <Text style={styles.info}>Espécie: {character.species}</Text>
      <Text style={styles.info}>Origem: {character.origin.name}</Text>
      <Text style={styles.info}>Local atual: {character.location.name}</Text>

    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },

  //pontinhos verdes estilo portal
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#00ff66",
    shadowColor: "#00ff66",
    shadowOpacity: 1,
    shadowRadius: 6,
  },

  //borda neon ao redor da imagem
  imageWrapper: {
    padding: 6,
    borderRadius: 120,
    backgroundColor: "#00ff66",
    shadowColor: "#00ff66",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    marginBottom: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#00ff66",
    marginTop: 10,
    marginBottom: 10,
    textShadowColor: "#00ff66",
    textShadowRadius: 10,
  },

  info: {
    fontSize: 18,
    color: "#e2e2e2",
    marginBottom: 6,
  }
});

