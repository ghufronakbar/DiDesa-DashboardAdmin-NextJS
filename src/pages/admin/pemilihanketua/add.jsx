import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { headAdmin } from "@/component/headAdmin";
import NavbarAdmin from "@/component/navbarAdmin";
import { withAuth } from "@/lib/authorizationAdmin";

function AddPemilihanKetuaDesa() {
  const toast = useToast()
  const router = useRouter();
  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_selesai: "",
    judul: "",
    deskripsi: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi tanggal_mulai tidak lebih besar dari tanggal_selesai
    if (new Date(formData.tanggal_mulai) > new Date(formData.tanggal_selesai)) {
      setError("Tanggal mulai harus sebelum tanggal selesai");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/pemilihanketua/add", formData);
      console.log("Response from server:", response.data);
      router.push("/admin/pemilihanketua");
      toast({
        title: "Insert Data Berhasil",
        status: "success",
      });
    } catch (error) {
      console.error("Error adding pemilihan ketua desa:", error);
      setError("Terjadi kesalahan saat menambahkan pemilihan ketua desa");
    }
  };

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br /><br />
      <main>
        <Container maxW='1500px'>
          <Heading>Tambah Pemilihan Ketua Desa</Heading>

          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel>Tanggal Mulai</FormLabel>
              <Input
                type="date"
                name="tanggal_mulai"
                value={formData.tanggal_mulai}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tanggal Selesai</FormLabel>
              <Input
                type="date"
                name="tanggal_selesai"
                value={formData.tanggal_selesai}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Judul</FormLabel>
              <Input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
              />
            </FormControl>

            {error && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Button mt={4} colorScheme="blue" type="submit">
              Submit
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}

export default withAuth(AddPemilihanKetuaDesa)