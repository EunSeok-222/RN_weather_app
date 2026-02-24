import { StyleSheet, Text, View } from "react-native";

export default function Weather() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>여기가 날씨 화면 </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});