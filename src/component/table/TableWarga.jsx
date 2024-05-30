import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
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

export function TableWarga() {
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
      const dataResponse = await axiosInstance.get("/warga");
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/warga/delete/${id}`);

      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/warga/${id}`);
  };

  return (
    <>
      {" "}
      <Flex>
        <Spacer flex={8} />

        <Box
          as="button"
          borderRadius="md"
          bg="#48BB78"
          color="white"
          px={4}
          h={10}
          onClick={() => {
            router.push("/admin/warga/add");
          }}
        >
          Tambah Warga
        </Box>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th></Th>
              <Th>Nama Lengkap</Th>
              <Th>NIK/KK</Th>
              <Th>Tanggal Lahir</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.values.map((data) => (
              <Tr key={data.berita_id}>
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
                </Td>
                <Td>
                  <Text as="b">{data.nik}</Text>
                  <Text>{data.kk}</Text>
                </Td>

                <Td>
                  <Text as="b">{formatDate(data.tanggal_lahir)}</Text>
                </Td>
                <Td>
                  <Center>
                    <Button
                      variant="outline"
                      colorScheme="grey"
                      onClick={() => handleDetail(data.warga_id)}
                    >
                      <Text as="b">Detail</Text>
                    </Button>
                  </Center>
                  <Center marginTop={1}>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(data.warga_id)}
                    >
                      Hapus
                    </Button>
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
