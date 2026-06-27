import { StyleSheet, Text, View } from "react-native";

type CircleProgressProps = {
  progress: number;
  showText?: boolean;
  size?: number;
  strokeWidth?: number;
};

export default function CircleProgress({
  progress,
  showText = false,
  size = 24,
  strokeWidth = 3,
}: CircleProgressProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const rotation = `${Math.round((safeProgress / 100) * 360)}deg`;
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <View style={styles.rightHalfClip}>
          <View
            style={[
              styles.halfArc,
              styles.rightHalfArc,
              {
                width: size / 2,
                height: size,
                borderTopRightRadius: size / 2,
                borderBottomRightRadius: size / 2,
                borderWidth: strokeWidth,
                borderLeftWidth: 0,
                transform: [{ rotate: rotation }],
              },
            ]}
          />
        </View>

        {safeProgress > 50 ? (
          <View style={styles.leftHalfClip}>
            <View
              style={[
                styles.halfArc,
                styles.leftHalfArc,
                {
                  width: size / 2,
                  height: size,
                  borderTopLeftRadius: size / 2,
                  borderBottomLeftRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderRightWidth: 0,
                },
              ]}
            />
          </View>
        ) : null}

        <View
          style={[
            styles.innerCircle,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
            },
          ]}
        />
      </View>

      {showText ? <Text style={styles.text}>{safeProgress}%</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  circle: {
    position: "relative",
    backgroundColor: "#DFF7D7",
    overflow: "hidden",
  },
  rightHalfClip: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
    height: "100%",
    overflow: "hidden",
  },
  leftHalfClip: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "50%",
    height: "100%",
    overflow: "hidden",
  },
  halfArc: {
    position: "absolute",
    top: 0,
    borderColor: "#2FD12B",
  },
  rightHalfArc: {
    right: 0,
  },
  leftHalfArc: {
    left: 0,
  },
  innerCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    color: "#121417",
  },
});
