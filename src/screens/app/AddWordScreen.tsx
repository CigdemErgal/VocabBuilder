import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";
import { dictionaryCategories, verbTypeOptions } from "../../data/mockWords";
import type { HomeParamList } from "../../navigation/HomeNavigator";
import { createWordThunk } from "../../store/wordsSlice";
import type { AppDispatch, RootState } from "../../store/store";
import type { VerbType, WordCategory } from "../../types/word";

type Props = NativeStackScreenProps<HomeParamList, "AddWord">;

export default function AddWordScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector(
    (state: RootState) => state.auth.user?.name ?? "User",
  );

  const [englishWord, setEnglishWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [category, setCategory] = useState<WordCategory>("verb");
  const [verbType, setVerbType] = useState<VerbType>("regular");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedCategoryLabel = useMemo(() => {
    return (
      dictionaryCategories.find((item) => item.value === category)?.label ??
      "Choose category"
    );
  }, [category]);

  const handleSubmit = async () => {
    if (!englishWord.trim() || !translation.trim()) {
      Alert.alert("Missing info", "Please fill in both word fields.");
      return;
    }

    try {
      await dispatch(
        createWordThunk({
          word: englishWord,
          ua: translation,
          category,
          verbType: category === "verb" ? verbType : undefined,
        }),
      ).unwrap();

      Alert.alert("Added", "The word has been added to your dictionary.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Add word failed", String(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.userIconWrapper}>
            <Image
              source={require("../../../assets/user-icon.png")}
              style={styles.userIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
          <Image
            source={require("../../../assets/log-out-02 .png")}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Add word</Text>

        <Text style={styles.description}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </Text>

        <View style={styles.dropdownBlock}>
          <Pressable
            onPress={() => setIsCategoryOpen((current) => !current)}
            style={styles.dropdownTrigger}
          >
            <Text style={styles.dropdownText}>{selectedCategoryLabel}</Text>
            <Image
              source={require("../../../assets/down-arrow.png")}
              style={styles.dropdownIcon}
              resizeMode="contain"
            />
          </Pressable>

          {isCategoryOpen ? (
            <View style={styles.dropdownMenu}>
              {dictionaryCategories.map((item) => {
                const isActive = item.value === category;

                return (
                  <Pressable
                    key={item.value}
                    onPress={() => {
                      setCategory(item.value);
                      setIsCategoryOpen(false);
                    }}
                    style={[
                      styles.dropdownOption,
                      isActive && styles.dropdownOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        isActive && styles.dropdownOptionTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        {category === "verb" ? (
          <>
            <View style={styles.radioList}>
              {verbTypeOptions.map((item) => {
                const isActive = item.value === verbType;

                return (
                  <Pressable
                    key={item.value}
                    onPress={() => setVerbType(item.value)}
                    style={styles.radioRow}
                  >
                    <View
                      style={
                        isActive ? styles.radioOuterActive : styles.radioOuter
                      }
                    >
                      {isActive ? <View style={styles.radioInner} /> : null}
                    </View>
                    <Text style={styles.radioText}>{item.label}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.helperText}>
              Such data must be entered in the format I form-II form-III form.
            </Text>
          </>
        ) : null}

        <View style={styles.languageRow}>
          <View style={[styles.flagCircle, styles.ukrainianFlag]} />
          <Text style={styles.languageText}>Ukrainian</Text>
        </View>
        <TextInput
          placeholder="Enter Ukrainian translation"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={translation}
          onChangeText={setTranslation}
        />

        <View style={styles.languageRow}>
          <Image
            source={require("../../../assets/united kingdom.png")}
            style={styles.ukFlag}
            resizeMode="contain"
          />
          <Text style={styles.languageText}>English</Text>
        </View>
        <TextInput
          placeholder="Enter English word"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={englishWord}
          onChangeText={setEnglishWord}
        />

        <Pressable onPress={handleSubmit} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.cancelLink}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F1",
  },
  backButton: {
    width: 28,
    alignItems: "flex-start",
  },
  backText: {
    fontSize: 28,
    lineHeight: 28,
    color: colors.brand,
    fontWeight: "300",
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  userIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  userIcon: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
  userName: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  logoutButton: {
    width: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutText: {
    fontSize: 14,
    color: colors.brand,
    marginRight: 4,
  },
  logoutIcon: {
    width: 16,
    height: 16,
    tintColor: colors.brand,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  dropdownBlock: {
    marginBottom: spacing.sm,
    zIndex: 2,
  },
  dropdownTrigger: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 24,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
  },
  dropdownMenu: {
    marginTop: spacing.xs,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
  },
  dropdownOptionActive: {
    backgroundColor: "rgba(133, 170, 159, 0.12)",
  },
  dropdownOptionText: {
    color: colors.text,
    fontSize: 16,
  },
  dropdownOptionTextActive: {
    color: colors.brand,
    fontWeight: "700",
  },
  radioList: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.brand,
    marginRight: 8,
  },
  radioOuterActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.brand,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  radioText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  helperText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  flagCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: spacing.sm,
  },
  ukrainianFlag: {
    backgroundColor: "#2F80ED",
  },
  ukFlag: {
    width: 26,
    height: 26,
    marginRight: spacing.sm,
  },
  languageText: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.textMuted,
  },
  input: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 18,
  },
  addButton: {
    minHeight: 58,
    borderRadius: 30,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  cancelLink: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.md,
  },
  cancelText: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: "600",
  },
});
