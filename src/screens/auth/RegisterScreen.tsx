import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { colors, spacing } from "../../constants/theme";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";
import { registerThunk } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function RegisterScreen({ navigation }: Props) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      await dispatch(
        registerThunk({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      ).unwrap();
    } catch (submitError) {
      Alert.alert("Register failed", String(submitError));
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
              source={require("../../../assets/illustration.png")}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.card}>
              <Text style={styles.title}>Register</Text>

              <Text style={styles.description}>
                To start using our services, please fill out the registration
                form below. All fields are mandatory:
              </Text>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Name"
                    style={styles.input}
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              ) : null}

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
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleSubmit(handleRegister)}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? "Loading..." : "Register"}
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Login</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  image: {
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
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
});
