import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata = {
  title: "تحدي العبايات - استمارة التقديم",
  description: "قدم الآن للمشاركة في تحدي العبايات وانمي علامتك التجارية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.className}>
      <body className={tajawal.variable}>{children}</body>
    </html>
  );
}
