import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { headAdmin } from "@/component/headAdmin";
import NavbarAdmin from "@/component/navbarAdmin";

export default function PemilihanKetuaDesa() {
  const router = useRouter();
  const [pemilihanData, setPemilihanData] = useState(null);
  

useEffect(() => {
  axiosInstance
    .get("/api/pemilihanketua")
    .then((response) => {
      console.log("Data Pemilihan Ketua Desa:", response.data);
      setPemilihanData(response.data.values);
    })
    .catch((error) => {
      console.error("Error fetching pemilihan data:", error);
    });
}, []);


  const handleDetailClick = (pemilihan_ketua_id) => {
    router.push(`/admin/pemilihanketua/${pemilihan_ketua_id}`);
  };

  const handleAddPemilihan = () => {
    router.push("/admin/pemilihanketua/add");
  };

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br /><br />
      <main>
        <Container maxW='1500px'>
          <Heading>Data Pemilihan Ketua Desa</Heading>

          <Button
            colorScheme="blue"
            mb={4}
            onClick={handleAddPemilihan}
          >
            Tambah Pemilihan
          </Button>

          {pemilihanData && pemilihanData.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Judul</Th>
                  <Th>Tanggal Mulai</Th>
                  <Th>Tanggal Selesai</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pemilihanData.map((pemilihan) => (
                  <Tr key={pemilihan.pemilihan_ketua_id}>
                    <Td>{pemilihan.pemilihan_ketua_id}</Td>
                    <Td>{pemilihan.judul}</Td>
                    <Td>{new Date(pemilihan.tanggal_mulai).toLocaleDateString()}</Td>
                    <Td>{new Date(pemilihan.tanggal_selesai).toLocaleDateString()}</Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleDetailClick(pemilihan.pemilihan_ketua_id)}
                      >
                        Detail
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Alert status="info">
              <AlertIcon />
              Tidak ada data pemilihan ketua desa.
            </Alert>
          )}
        </Container>
      </main>
    </>
  );
}
