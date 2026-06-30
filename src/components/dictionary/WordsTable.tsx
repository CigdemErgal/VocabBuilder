import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import type { DictionaryWord } from "../../store/wordMapper";
import ProgressCircle from "./ProgressCircle";

type WordsTableProps = {
  words: DictionaryWord[];
  onEdit: (word: DictionaryWord) => void;
  onDelete: (wordId: string) => void;
};

export default function WordsTable({
  words,
  onEdit,
  onDelete,
}: WordsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text
          style={[styles.headerCell, styles.wordColumn, styles.columnDivider]}
        >
          Word
        </Text>
        <Text
          style={[
            styles.headerCell,
            styles.translationColumn,
            styles.columnDivider,
          ]}
        >
          Translation
        </Text>
        <Text
          style={[
            styles.headerCell,
            styles.progressColumn,
            styles.columnDivider,
          ]}
        >
          Progress
        </Text>
        <Text style={[styles.headerCell, styles.actionsColumn]}></Text>
      </View>

      {words.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={[styles.cell, styles.wordColumn, styles.columnDivider]}>
            {item.word}
          </Text>
          <Text
            style={[
              styles.cell,
              styles.translationColumn,
              styles.columnDivider,
            ]}
          >
            {item.translation}
          </Text>
          <View
            style={[styles.cell, styles.progressColumn, styles.columnDivider]}
          >
            <ProgressCircle progress={item.progress ?? 0} />
          </View>

          <View style={[styles.actionsCell, styles.actionsColumn]}>
            <Pressable
              onPress={() =>
                setOpenMenuId((currentId) =>
                  currentId === item.id ? null : item.id,
                )
              }
              style={styles.menuTrigger}
            >
              <Text style={styles.menuTriggerText}>...</Text>
            </Pressable>

            {openMenuId === item.id ? (
              <View style={styles.popupMenu}>
                <Pressable
                  onPress={() => {
                    setOpenMenuId(null);
                    onEdit(item);
                  }}
                  style={styles.popupItem}
                >
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setOpenMenuId(null);
                    onDelete(item.id);
                  }}
                  style={styles.popupItem}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F7F9F9",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  headerCell: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cell: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  columnDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  wordColumn: {
    width: "30%",
  },
  translationColumn: {
    width: "35%",
  },
  progressColumn: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionsColumn: {
    width: "15%",
  },
  actionsCell: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  menuTrigger: {
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  menuTriggerText: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.textMuted,
  },
  popupMenu: {
    position: "absolute",
    right: 4,
    bottom: 28,
    minWidth: 88,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    zIndex: 10,
  },
  popupItem: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  editText: {
    fontSize: 13,
    color: colors.brand,
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: "600",
  },
});
