import {
  Box,
  Button,
  Center,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function TablePengurusDesa() {
  const router = useRouter();
  const toast = useToast();
  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/pengurusdesa");
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/pengurusdesa/delete/${id}`);

      toast({
        title: "Pengurus Desa has been deleted",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/pengurusdesa/${id}`);
  };

  const handleNonAdmin = async (id) => {
    try {
      await axiosInstance.put(`/pengurusdesa/akses/${id}`, { akses_admin: 1,id });
      toast({
        title: "This user has been admin",
        status: "success",
      });
      refetchData()
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleAdmin = async (id) => {
    try {
      await axiosInstance.put(`/pengurusdesa/akses/${id}`, { akses_admin: 0,id });
      toast({
        title: "This user has not been admin",
        status: "warning",
      });
      refetchData()
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th></Th>
            <Th>Nama Lengkap</Th>
            <Th>Jabatan</Th>
            <Th>Akses Admin</Th>
            <Th>Tanggal Lahir</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((data) => (
            <Tr key={data.pengurus_desa_anggota_id}>
              <Td>{i++}</Td>
              <Td>
                <Image
                  borderRadius="18"
                  boxSize="60px"
                  objectFit="cover"
                  src={data.foto}
                  alt={data.foto}
                />
              </Td>
              <Td>
                <Text as="b">{data.nama_lengkap}</Text>
                <Text>{data.nik}</Text>
              </Td>
              <Td>
                <Text>{data.jabatan}</Text>
              </Td>
              <Td>
                <Center>
                  {data.akses_admin == 1 ? (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      onClick={()=>{handleAdmin(data.pengurus_desa_anggota_id)}}
                    >
                      Admin
                    </Box>
                  ) : (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#E53E3E"
                      color="white"
                      px={4}
                      h={8}
                      onClick={()=>{handleNonAdmin(data.pengurus_desa_anggota_id)}}
                    >
                      Not Admin
                    </Box>
                  )}
                </Center>
              </Td>

              <Td>
                <Text as="b">{formatDate(data.tanggal_lahir)}</Text>
              </Td>
              <Td>
                <Center>
                  <Button
                    variant="outline"
                    colorScheme="grey"
                    onClick={() => handleDetail(data.pengurus_desa_anggota_id)}
                  >
                    <Text as="b">Detail</Text>
                  </Button>
                </Center>
                <Center marginTop={1}>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(data.pengurus_desa_anggota_id)}
                  >
                    Delete
                  </Button>
                </Center>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
