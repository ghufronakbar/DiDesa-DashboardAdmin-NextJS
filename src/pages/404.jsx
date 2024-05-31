import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
        title: "Halaman tidak tersedia, redirect ke dashboard",
        status: "error",
      });
      router.push(`/admin/umkm`);  
  })
  return null
}
