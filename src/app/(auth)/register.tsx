import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/illustration.png")}
        />
        <View style={styles.card}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.description}>
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </Text>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputText}>Name</Text>
          </View>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputText}>Email</Text>
          </View>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputText}>Password</Text>
          </View>

          <Pressable style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 247,
    height: 191,
    alignSelf: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "rgba(133, 170, 159, 0.1)",

    width: "100%",

    padding: 20,
    borderRadius: 25,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,

    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
    marginBottom: 16,
  },
  inputPlaceholder: {
    height: 56,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  registerButton: {
    height: 56,
    backgroundColor: "#85AA9F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  inputText: {
    fontSize: 16,
    color: "#121417",
  },
});
