import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";


export default function Details() {
    const params = useLocalSearchParams();

    useEffect(() => {
        fetchPokemonByName(params.name as string);
    }, []);

    async function fetchPokemonByName(name: string) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <>
            <Stack.Screen options={{
                title: params.name as string, headerTitleAlign: "center",
            }} />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>여기가 디테일 페이지</Text>
                <Text style={styles.text}>{params.name}</Text>
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        gap: 16,
        backgroundColor: "green",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        gap: 16,
        padding: 16,
    },
});