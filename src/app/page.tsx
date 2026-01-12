// // src/app/page.tsx
// export default function Home() {
//   return (
//     <div style={{ padding: 40, textAlign: "center" }}>
//       กรุณาเปิดลิงก์จาก SMS ที่ได้รับ
//     </div>
//   );
// }

// src/app/page.tsx

import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    token?: string;
  };
};

export default function Home({ searchParams }: Props) {
  const token = searchParams.token;

  if (token) {
    redirect(`/satisfaction?token=${token}`);
  }

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      กรุณาเปิดลิงก์จาก SMS ที่ได้รับ
    </div>
  );
}
