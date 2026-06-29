import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../../constants/theme";

type WordsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function WordsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: WordsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
        style={[styles.arrowButton, currentPage === 1 && styles.buttonDisabled]}
      >
        <Text style={styles.arrowLabel}>Prev</Text>
      </Pressable>

      <View style={styles.pageList}>
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <Pressable
              key={page}
              accessibilityRole="button"
              onPress={() => onPageChange(page)}
              style={[styles.pageButton, isActive && styles.pageButtonActive]}
            >
              <Text
                style={[styles.pageLabel, isActive && styles.pageLabelActive]}
              >
                {page}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        style={[
          styles.arrowButton,
          currentPage === totalPages && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.arrowLabel}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    gap: 8,
  },
  pageList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  pageButtonActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  pageLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "500",
  },
  pageLabelActive: {
    color: colors.white,
  },
  arrowButton: {
    minWidth: 54,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
  arrowLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
});
