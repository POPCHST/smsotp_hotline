"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API;

export default function SatisfactionClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!token) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <p style={{ color: "#dc2626" }}>❌ ลิงก์ไม่ถูกต้อง</p>
        </div>
      </div>
    );
  }

  async function submit() {
    if (!score) {
      alert("กรุณาเลือกคะแนนความพึงพอใจ");
      return;
    }

    if (!API_BASE) {
      setMessage("ระบบยังไม่ได้ตั้งค่า API");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const url = `${API_BASE}/api/satisfaction`;
      console.log("POST →", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          score,
          comment,
        }),
      });

      let data: any = null;
      const text = await res.text();

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      console.log("status:", res.status);
      console.log("response:", data);

      if (!res.ok) {
        setMessage(data?.message || "เกิดข้อผิดพลาดจากระบบ");
      } else {
        setMessage("ขอบคุณสำหรับการประเมินของคุณ 🙏");
      }
    } catch (err) {
      console.error("NETWORK ERROR:", err);
      setMessage("ไม่สามารถเชื่อมต่อระบบได้");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h2 style={styles.title}>ประเมินความพึงพอใจ</h2>
        <p style={styles.subtitle}>
          ความคิดเห็นของคุณช่วยให้เราพัฒนาบริการได้ดียิ่งขึ้น
        </p>

        <div style={styles.stars}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setScore(n)}
              style={{
                ...styles.star,
                color: n <= (score ?? 0) ? "#fbbf24" : "#f8dcdc",
                transform: n === score ? "scale(1.15)" : "scale(1)",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p style={styles.scoreText}>
          {score ? `คุณให้ ${score} คะแนน` : "กรุณาเลือกคะแนน"}
        </p>

        <textarea
          placeholder="ความคิดเห็นเพิ่มเติม (ไม่บังคับ)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={submit}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "กำลังส่ง..." : "ส่งแบบประเมิน"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #fde2e4 0%, #e0f2fe 50%, #ecfeff 100%)",
    padding: 16,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fffafc",
    borderRadius: 24,
    padding: "32px 28px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 6,
    color: "#374151",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 1.6,
  },

  stars: {
    fontSize: 44,
    marginBottom: 8,
    cursor: "pointer",
  },

  star: {
    margin: "0 6px",
    transition: "all 0.2s ease",
  },

  scoreText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 18,
  },

  textarea: {
    width: "100%",
    minHeight: 96,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    resize: "none",
    fontSize: 14,
    outline: "none",
    marginBottom: 18,
    background: "#ffffff",
    color: "#353535",
  },

  button: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #a7f3d0 0%, #bae6fd 100%)",
    color: "#065f46",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  message: {
    marginTop: 18,
    fontSize: 14,
    color: "#15803d",
  },
};
