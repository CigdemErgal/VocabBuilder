import { StyleSheet, Text, View } from "react-native";
import ProgressCircle from "../dictionary/ProgressCircle";

import { colors } from "../../constants/theme";

const sampleWords = [
  {
    id: "1",
    word: "Apple",
    translation: "Elma",
    progress: { value: 40 },
    Edit: "",
  },
  {
    id: "2",
    word: "Book",
    translation: "Kitap",
    progress: { value: 70 },
    Edit: "",
  },
  {
    id: "3",
    word: "Water",
    translation: "Su",
    progress: { value: 20 },
    Edit: "",
  },
  {
    id: "4",
    word: "Window",
    translation: "Pencere",
    progress: { value: 55 },
    Edit: "",
  },
];

export default function WordsTable() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.wordColumn]}>Word</Text>
        <Text style={[styles.headerCell, styles.translationColumn]}>
          Translation
        </Text>
        <Text style={[styles.headerCell, styles.progressColumn]}>Progress</Text>
        <Text style={[styles.headerCell, styles.editColumn]}> ... </Text>
      </View>

      {sampleWords.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={[styles.cell, styles.wordColumn]}>{item.word}</Text>
          <Text style={[styles.cell, styles.translationColumn]}>
            {item.translation}
          </Text>
          <View style={[styles.cell, styles.progressColumn]}>
            <ProgressCircle value={item.progress.value} />
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
    overflow: "hidden",
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
  },
  headerCell: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  cell: {
    fontSize: 14,
    color: colors.text,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  wordColumn: {
    width: "34%",
  },
  translationColumn: {
    width: "38%",
  },
  progressColumn: {
    width: "28%",
  },
  edit: {
    backgroundColor: "#121417",
    width: 12,
    height: 22,
  },
  editColumn: {
    width: "28%",
  },
});
