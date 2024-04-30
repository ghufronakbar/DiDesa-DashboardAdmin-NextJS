import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { headAdmin } from "@/component/headAdmin";
import NavbarAdmin from "@/component/navbarAdmin";
import { withAuth } from "@/lib/authorizationAdmin";

function InformasiDesaIndex() {
  const toast = useToast();
  const [informasiDesa, setInformasiDesa] = useState({
    nama_desa: "",
    deskripsi: "",
    luas_lahan_pertanian: 0,
    lahan_peternakan: 0,
  });

  useEffect(() => {
    const fetchInformasiDesa = async () => {
      try {
        const response = await axiosInstance.get("/api/informasidesa");
        const data = response.data.values[0];
        setInformasiDesa({
          nama_desa: data.nama_desa,
          deskripsi: data.deskripsi,
          luas_lahan_pertanian: data.luas_lahan_pertanian,
          lahan_peternakan: data.lahan_peternakan,
        });
      } catch (error) {
        console.error("Error fetching Informasi Desa:", error);
      }
    };

    fetchInformasiDesa();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformasiDesa((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(
        "/api/informasidesa/edit",
        informasiDesa
      );
      console.log("Response from server:", response.data);
      // Reload the page

      toast({
        title: "Update Data Berhasil",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating Informasi Desa:", error);
    }
  };

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br />
      <br />
      <Container maxW="1500px">
        <Heading as="h1" my={6}>
          Informasi Desa
        </Heading>
        <FormControl mt={4}>
          <FormLabel>Nama Desa</FormLabel>
          <Input
            type="text"
            name="nama_desa"
            value={informasiDesa.nama_desa}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Deskripsi</FormLabel>
          <Textarea
            name="deskripsi"
            value={informasiDesa.deskripsi}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Luas Lahan Pertanian</FormLabel>
          <Input
            type="number"
            name="luas_lahan_pertanian"
            value={informasiDesa.luas_lahan_pertanian}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Lahan Peternakan</FormLabel>
          <Input
            type="number"
            name="lahan_peternakan"
            value={informasiDesa.lahan_peternakan}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" onClick={handleUpdate}>
          Update
        </Button>
      </Container>
    </>
  );
}

export default withAuth(InformasiDesaIndex);
