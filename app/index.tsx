import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// {"name": "florges", "url": "https://pokeapi.co/api/v2/pokemon/671/"}
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

const colorsByType: Record<string, string> = {
  normal: "#e0e0a5ff",
  fire: "#eec8adff",
  water: "#a8d8f0ff",
  grass: "#a6dfbbff",
  electric: "#f0e1b2ff",
  ice: "#d0f0f0ff",
  fighting: "#eeababff",
  poison: "#d5a2e9ff",
  ground: "#e8d694ff",
  flying: "#c2d6f0ff",
  psychic: "#ecdbb1ff",
  bug: "#d1e8a5ff",
  rock: "#d6c294ff",
  ghost: "#b9a8cdff",
  dragon: "#d6b0f0ff",
  steel: "#d6d6d6ff",
  dark: "#b9a8a0ff",
  fairy: "#f0c2d6ff",
};

export default function Index() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  console.log('pokemonData', JSON.stringify(pokemonData[0], null, 2));

  useEffect(() => {
    getPokemonData();
  }, []);

  async function getPokemonData() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();

      const detailedPokemonData = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            type: details.types,
          };
        })
      );

      setPokemonData(detailedPokemonData);
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
    >
      <Link href={{ pathname: '/weather' }}>날씨</Link>
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.name}
          href={{ pathname: '/details', params: { name: pokemon.name } }}>
          <View
            style={[
              styles.pokemonContainer,
              { backgroundColor: colorsByType[pokemon.type[0].type.name] }
            ]}
          >
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.type[0].type.name}</Text>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: pokemon.image }} />
              <Image style={styles.image} source={{ uri: pokemon.imageBack }} />
            </View>
          </View>
        </Link>

      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  type: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  name: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  pokemonContainer: {
    borderRadius: 20,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
});