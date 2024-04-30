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
  import { axiosInstance } from "@/lib/axios";
  import { useQuery } from "@tanstack/react-query";
  import { useRouter } from "next/router";
  
  export function TableKomentar() {
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
        const dataResponse = await axiosInstance.get("/berita");
        return dataResponse;
      },
    });
  
    const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(`/berita/delete/${id}`);
  
        toast({
          title: "Berita has been deleted",
          status: "warning",
        });
        refetchData();
      } catch (error) {
        console.error("Error rejecting request:", error);
      }
    };
  
    const handleDetail = (id) => {
      router.push(`/admin/berita/${id}`);
    };
  
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th></Th>
              <Th>Judul</Th>
              <Th>Publikasi</Th>
              <Th>Prioritas</Th>
              <Th>Tanggal</Th>
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
                    src={data.gambar}
                    alt={data.gambar}
                  />
                </Td>
                <Td>
                  <Text as="b">{data.judul}</Text>
                  <Text>{data.subjudul}</Text>
                </Td>
                <Td>
                  <Center>
                    {data.publikasi == 0 && (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#E53E3E"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Not Public
                      </Box>
                    )}
                    {data.publikasi == 1 && (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#48BB78"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Public
                      </Box>
                    )}
                  </Center>
                </Td>
                <Td>
                <Center>
                    {data.prioritas == 0 && (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#E53E3E"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Tidak Prioritas
                      </Box>
                    )}
                    {data.prioritas == 1 && (
                      <Box
                        as="button"
                        borderRadius="md"
                        bg="#48BB78"
                        color="white"
                        px={4}
                        h={8}
                      >
                        Prioritas
                      </Box>
                    )}
                  </Center>
                </Td>
                <Td>
                  <Text as="b">{formatDate(data.tanggal)}</Text>
                </Td>
                <Td>
                  <Center>
                    <Button
                      variant="outline"
                      colorScheme="grey"
                      onClick={() => handleDetail(data.berita_id)}
                    >
                      <Text as="b">Detail</Text>
                    </Button>
                  </Center>
                  <Center marginTop={1}>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(data.berita_id)}
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
  