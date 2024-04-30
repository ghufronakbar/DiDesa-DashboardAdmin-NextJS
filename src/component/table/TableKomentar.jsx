import {
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
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function TableKomentar() {
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
      const dataResponse = await axiosInstance.get("/komentar");
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/komentar/delete/${id}`);

      toast({
        title: "Komentar has been deleted",
        status: "warning",
      });
      refetchData();
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
            <Th>Berita</Th>
            <Th>Komentar</Th>
            <Th>Tanggal</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((data) => (
            <Tr key={data.komentar_id}>
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
                <Text noOfLines={[1, 2, 3]}>{data.judul}</Text>
              </Td>
              <Td>
                <Text>{data.isi}</Text>
              </Td>
              <Td>
                <Text as="b">{formatDate(data.tanggal)}</Text>
              </Td>
              <Td>
                <Center marginTop={1}>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(data.komentar_id)}
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
