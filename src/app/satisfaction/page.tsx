import { Suspense } from "react";
import SatisfactionClient from "./SatisfactionClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#6b7280",
          }}
        >
          กำลังโหลดแบบประเมิน...
        </div>
      }
    >
      <SatisfactionClient />
    </Suspense>
  );
}
