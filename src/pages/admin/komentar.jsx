import {
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { headAdmin } from "@/component/headAdmin";
import NavbarAdmin from "@/component/navbarAdmin";
import { withAuth } from "@/lib/authorizationAdmin";

function Komentar() {
  const toast = useToast();

  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/api/komentar");
      return response;
    },
  });

  const { mutate: deleteKomentar } = useMutation({
    mutationFn: async (komentar_id) => {
      const response = await axiosInstance.delete(
        `/api/komentar/delete/${komentar_id}`
      );
      return response;
    },
    onSuccess: () => {
      refetchData();
      toast({
        title: "Delete Data Berhasil",
        status: "warning",
      });
    },
  });

  const confirmationDelete = (komentar_id) => {
    const shouldDelete = confirm("Yakin ingin menghapus komentar ini?");
    if (shouldDelete) {
      deleteKomentar(komentar_id);
    }
  };

  const renderKomentar = () => {
    return data?.data.values.map((komentar) => {
      return (
        <Tr key={komentar.komentar_id}>
          <Td>{komentar.komentar_id}</Td>
          <Td>{komentar.nama_lengkap}</Td>
          <Td>{komentar.judul}</Td>
          <Td>{komentar.isi}</Td>
          <Td>{new Date(komentar.tanggal).toLocaleDateString()}</Td>
          <Td>
            <Button
              onClick={() => confirmationDelete(komentar.komentar_id)}
              colorScheme="red"
            >
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      {headAdmin()}
      <main>
        {NavbarAdmin()}
        <br />
        <br />
        <Container maxW="1500px">
          <Heading>Data Komentar</Heading>

          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nama</Th>
                <Th>Judul Berita</Th>
                <Th>Isi Komentar</Th>
                <Th>Tanggal</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>{renderKomentar()}</Tbody>
          </Table>
        </Container>
      </main>
    </>
  );
}

export default withAuth(Komentar);
