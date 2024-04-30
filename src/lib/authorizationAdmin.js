import { useRouter } from "next/router";
import { useEffect } from "react";

// Fungsi untuk melakukan pengecekan token pada setiap akses halaman yang memerlukan authorization
export function withAuth(Component) {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      // Jika token tidak ada, redirect ke halaman login
      if (!token) {
        router.push("/admin/login");
      }
    }, []);

    // Render komponen yang dimasukkan
    return <Component {...props} />;
  };
}
