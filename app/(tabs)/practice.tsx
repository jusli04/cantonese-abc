import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const API_BASE = "http://172.20.10.2:3001";

export default function PracticeScreen() {
  const [lesson, setLesson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [attemptText, setAttemptText] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const res = await fetch(`${API_BASE}/api/lesson/today`);
        const json = await res.json();
        if (!json?.ok) throw new Error("Failed to load lesson");
        setLesson(json.lesson);
      } catch (e: any) {
        setError(e?.message ?? String(e));
      }
    })();
  }, []);

  async function submitAttempt() {
    if (!lesson) return;

    try {
      setError(null);
      const res = await fetch(`${API_BASE}/api/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          attemptText,
        }),
      });

      const json = await res.json();
      if (!json?.ok) throw new Error("Submit failed");
      setResult(json.result);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today’s Lesson</Text>

      {lesson ? (
        <>
          <Text style={styles.phrase}>{lesson.phrase}</Text>
          <Text style={styles.english}>{lesson.english}</Text>
          <Text style={styles.jyutping}>{lesson.jyutping}</Text>

          <View style={{ width: "100%", marginTop: 16 }}>
            <TextInput
              value={attemptText}
              onChangeText={(t) => {
                setAttemptText(t);
                setResult(null);
              }}
              placeholder="Type what you saw…"
              autoCapitalize="none"
              style={styles.input}
            />
            <Button title="Submit Attempt" onPress={submitAttempt} />
          </View>

          {result && (
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text style={{ fontWeight: "600" }}>
                Score: {result.score}
              </Text>
              <Text style={{ marginTop: 6, textAlign: "center" }}>
                {result.feedback}
              </Text>
            </View>
          )}
        </>
      ) : (
        <>
          <Text>Loading lesson…</Text>
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a87c15ff", padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  phrase: { fontSize: 28, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  english: { fontSize: 16, marginBottom: 6, textAlign: "center" },
  jyutping: { fontSize: 16, fontStyle: "italic", color: "#2a2222ff", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#000000ff", padding: 12, borderRadius: 10, marginBottom: 10 },
  errorText: { color: "red", marginTop: 10, textAlign: "center" },
});
