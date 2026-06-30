import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import { colors, spacing } from "../../constants/theme";
import type { DictionaryWord } from "../../store/wordMapper";

type EditWordModalProps = {
  visible: boolean;
  word: DictionaryWord | null;
  onClose: () => void;
  onSave: (payload: { id: string; word: string; translation: string }) => void;
};

export default function EditWordModal({
  visible,
  word,
  onClose,
  onSave,
}: EditWordModalProps) {
  const [english, setEnglish] = useState("");
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    setEnglish(word?.word ?? "");
    setTranslation(word?.translation ?? "");
  }, [word]);

  if (!word) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit word</Text>
          <Text style={styles.description}>
            Update the pair and keep the progress card in sync.
          </Text>

          <TextInput
            value={english}
            onChangeText={setEnglish}
            placeholder="English word"
            style={styles.input}
          />
          <TextInput
            value={translation}
            onChangeText={setTranslation}
            placeholder="Translation"
            style={styles.input}
          />

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.secondaryButton}>
              <Text style={styles.secondaryLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                onSave({
                  id: word.id,
                  word: english.trim(),
                  translation: translation.trim(),
                })
              }
              style={styles.primaryButton}
            >
              <Text style={styles.primaryLabel}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(18, 20, 23, 0.48)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  secondaryLabel: {
    color: colors.text,
    fontWeight: "600",
  },
  primaryLabel: {
    color: colors.white,
    fontWeight: "700",
  },
});
