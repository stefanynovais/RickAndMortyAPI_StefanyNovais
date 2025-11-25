import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {

    //controle das animações das partículas
    const particles = Array.from({ length: 20 }).map(() => ({
        opacity: useRef(new Animated.Value(Math.random())).current,
        top: Math.random() * height,
        left: Math.random() * width,
    }));

    useEffect(() => {

        //animação infinita das partículas piscando
        particles.forEach(p => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(p.opacity, {
                        toValue: 0.1,
                        duration: 800 + Math.random() * 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(p.opacity, {
                        toValue: 1,
                        duration: 800 + Math.random() * 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });

        //timer para ir para tela principal
        const timer = setTimeout(() => {
            navigation.replace("CharactersListScreen");
        }, 5000); //após 3 segundos, vai para a tela inicial

        return () => clearTimeout(timer); //limpa o timer ao sair 
    }, []);

    return (
        <LinearGradient //funciona como um container, como a view
            colors={['#080808ff', '#080808ff']} // cores do degradê
            style={styles.container}
        >

            {/* partículas verdes brilhando */}
            {particles.map((p, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.particle,
                        {
                            top: p.top,
                            left: p.left,
                            opacity: p.opacity,
                        }
                    ]}
                />
            ))}

            <Text style={styles.logo}>Rick And Morty</Text>
        </LinearGradient>
    );
};

//estilização da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    // estilo dos pontinhos verdes
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

    logo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#0b7234ff",
    },
});

export default SplashScreen;
