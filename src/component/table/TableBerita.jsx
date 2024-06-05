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
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loading } from "../Loading";
import formatDate from "../../lib/formatDate";

export function TableBerita({ gap }) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true)

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/berita");
      setIsloading(false)
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/berita/delete/${id}`);

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
    router.push(`/admin/berita/${id}`);
  };

  const handleNonPublic = async (id) => {
    try {
      const response = await axiosInstance.put(`/berita/publikasi/${id}`, {
        publikasi: 1,
        id,
      });
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handlePublic = async (id) => {
    try {
      const response = await axiosInstance.put(`/berita/publikasi/${id}`, {
        publikasi: 0,
        id,
      });
      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleNonPriority = async (id) => {
    try {
      const response = await axiosInstance.put(`/berita/prioritas/${id}`, {
        prioritas: 1,
        id,
      });
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handlePriority = async (id) => {
    try {
      const response = await axiosInstance.put(`/berita/prioritas/${id}`, {
        prioritas: 0,
        id,
      });
      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  if(isLoading)return(<><Loading/></>)

  return (
    <>
      <Flex m={gap} direction="column" w="100%">
        <Flex mb={8}>
        <Heading>Berita</Heading>
        <Spacer flex={8}  />
        <Box
          as="button"
          borderRadius="md"
          bg="#48BB78"
          color="white"
          px={4}
          h={10}
          onClick={() => {
            router.push("/admin/berita/add");
          }}
        >
          Tambah Berita
        </Box>
        </Flex>
        <TableContainer>
          <Table size="sm">
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
                          onClick={() => {
                            handleNonPublic(data.berita_id);
                          }}
                        >
                          Disembunyikan
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
                          onClick={() => {
                            handlePublic(data.berita_id);
                          }}
                        >
                          Dipublikasi
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
                          onClick={() => {
                            handleNonPriority(data.berita_id);
                          }}
                        >
                          Berita Umum
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
                          onClick={() => {
                            handlePriority(data.berita_id);
                          }}
                        >
                          Berita Prioritas{" "}
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
                        Hapus
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
