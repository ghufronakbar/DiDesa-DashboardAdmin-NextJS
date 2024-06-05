import {
  Button,
  Center,
  Flex,
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
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { useState } from "react";
import formatString from "../../lib/formatString";
import formatDate from "../../lib/formatDate";

export const TableKomentar = ({ gap }) => {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true);

  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/komentar");
      setIsloading(false);
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/komentar/delete/${id}`);

      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <Flex direction="column" m={gap} w="100%">
        <Heading mb={gap}>Komentar</Heading>
        <TableContainer>
          <Table size="sm">
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
                    <Tooltip
                      hasArrow
                      label={data.judul}
                      bg="gray.300"
                      color="black"
                    >
                      <Text>{formatString(data.judul,30)}</Text>
                    </Tooltip>
                  </Td>
                  <Td>
                  <Tooltip
                      hasArrow
                      label={data.isi}
                      bg="gray.300"
                      color="black"
                    >
                      <Text>{formatString(data.isi,30)}</Text>
                    </Tooltip>
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
      </Flex>
    </>
  );
};
