import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";
import { colors, spacing } from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginScreen({ navigation }: Props) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formData: LoginFormData) => {
    try {
      await dispatch(
        loginThunk({
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      ).unwrap();
    } catch (error) {
      Alert.alert("Login failed", String(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../../../assets/illustration.png")}
              resizeMode="contain"
            />
            <Text style={styles.metaText}>
              Word - Translation - Grammar - Progress
            </Text>
            <View style={styles.card}>
              <Text style={styles.title}>Login</Text>

              <Text style={styles.description}>
                Please enter your login details to continue using our service:
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              ) : null}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={isPasswordHidden}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />

                    <Pressable
                      onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                    >
                      <Image
                        source={
                          isPasswordHidden
                            ? require("../../../assets/eye-off.png")
                            : require("../../../assets/eye.png")
                        }
                        style={styles.eyeIcon}
                      />
                    </Pressable>
                  </View>
                )}
              />

              {errors.password ? (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              ) : null}

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Pressable
                onPress={handleSubmit(handleLogin)}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? "Loading..." : "Login"}
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#D80027",
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  logo: {
    width: 247,
    height: 191,
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  card: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "rgba(133, 170, 159, 0.1)",
    padding: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    color: colors.text,
  },
  passwordWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    color: colors.text,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
  primaryButton: {
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  linkText: {
    textAlign: "center",
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  metaText: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: spacing.lg,
  },
});
