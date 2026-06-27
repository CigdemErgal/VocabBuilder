import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";
import { mockTrainingTasks } from "../../data/mockWords";

export default function TrainingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    {},
  );

  const task = mockTrainingTasks[currentIndex];
  const completedCount = Object.keys(selectedAnswers).length;
  const progress = useMemo(
    () => Math.round((completedCount / mockTrainingTasks.length) * 100),
    [completedCount],
  );

  const handleSelect = (value: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [task.id]: value,
    }));
  };

  const isLastStep = currentIndex === mockTrainingTasks.length - 1;
  const currentAnswer = selectedAnswers[task.id];
  const score = Object.entries(selectedAnswers).filter(([taskId, answer]) => {
    const currentTask = mockTrainingTasks.find((item) => item.id === taskId);

    return currentTask?.answer === answer;
  }).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Training</Text>
        <Text style={styles.description}>
          A lightweight training room so the core study loop feels complete.
        </Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Daily progress</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressHint}>
            {completedCount} / {mockTrainingTasks.length} tasks answered
          </Text>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.taskCount}>
            Task {currentIndex + 1} of {mockTrainingTasks.length}
          </Text>
          <Text style={styles.taskPrompt}>{task.prompt}</Text>

          <View style={styles.optionList}>
            {task.options.map((option) => {
              const isActive = option === currentAnswer;

              return (
                <Pressable
                  key={option}
                  onPress={() => handleSelect(option)}
                  style={[styles.option, isActive && styles.optionActive]}
                >
                  <Text
                    style={[styles.optionText, isActive && styles.optionTextActive]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            disabled={!currentAnswer}
            onPress={() => {
              if (!isLastStep) {
                setCurrentIndex((index) => index + 1);
              }
            }}
            style={[
              styles.primaryButton,
              !currentAnswer && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isLastStep ? `Score ${score}/${mockTrainingTasks.length}` : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.brand,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#D8F8D8",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
  },
  progressHint: {
    color: colors.textMuted,
    fontSize: 13,
  },
  taskCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  taskCount: {
    color: colors.textMuted,
    fontSize: 13,
  },
  taskPrompt: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
    color: colors.text,
  },
  optionList: {
    gap: spacing.sm,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  optionActive: {
    borderColor: colors.brand,
    backgroundColor: "#EAF4F1",
  },
  optionText: {
    color: colors.text,
    fontWeight: "600",
  },
  optionTextActive: {
    color: colors.brand,
  },
  primaryButton: {
    marginTop: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.brand,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
