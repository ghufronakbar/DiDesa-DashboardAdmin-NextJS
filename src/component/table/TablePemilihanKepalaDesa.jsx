import {
  Box,
  Button,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function TablePemilihanKepalaDesa() {
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
      const dataResponse = await axiosInstance.get("/pemilihankepaladesa");
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/pemilihankepaladesa/delete/${id}`);

      toast({
        title: "Warga has been deleted",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/pemilihankepaladesa/${id}`);
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Judul</Th>
            <Th>Status</Th>
            <Th>Tanggal Mulai</Th>
            <Th>Tanggal Selesai</Th>
            <Th>Calon Ketua</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.values.map((item) => (
            <Tr key={item.pemilihan_ketua_id}>
              <Td>{i++}</Td>
              <Td>
                <Text as="b"> {item.judul}</Text>
              </Td>
              <Td>
                <VStack>
                  {item.status == 1 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#CBD5E0"
                      color="white"
                      px={4}
                      h={8}
                    >
                      Not Started
                    </Box>
                  )}

                  {item.status == 2 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#0063d1"
                      color="white"
                      px={4}
                      h={8}
                    >
                      Ongoing
                    </Box>
                  )}
                  {item.status == 3 && (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                    >
                      Finished
                    </Box>
                  )}
                </VStack>
              </Td>
              <Td>
                <Text as="b">{formatDate(item.tanggal_mulai)}</Text>
              </Td>
              <Td>
                <Text as="b">{formatDate(item.tanggal_selesai)}</Text>
              </Td>

              <Td>
                <Text>
                  {item.calon_ketua.length > 0 ? (
                    item.calon_ketua.map((calon) => (
                      <VStack>
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#4FD1C5"
                          color="white"
                          px={4}
                          h={8}
                          m={2}
                        >
                          {calon.namalengkap}
                        </Box>
                      </VStack>
                    ))
                  ) : (
                    <VStack>
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#E53E3E"
                        color="white"
                        px={4}
                        h={8}
                        m={2}
                      >
                        Tidak Ada Calon
                      </Box>
                    </VStack>
                  )}
                </Text>
              </Td>
              <Td>
                <Center>
                  <Button
                    variant="outline"
                    colorScheme="grey"
                    onClick={() => handleDetail(item.pemilihan_ketua_id)}
                  >
                    <Text as="b">Detail</Text>
                  </Button>
                </Center>
                <Center marginTop={1}>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(item.pemilihan_ketua_id)}
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
