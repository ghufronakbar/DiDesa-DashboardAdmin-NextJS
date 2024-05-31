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
  Heading
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { useState } from "react";


export const TableKomentar = ({ gap }) => {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true)

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
      setIsloading(false)
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
  if(isLoading)return(<><Loading/></>)

  return (
    <>
      <Flex direction="column" m={gap} w="100%">
        <Heading mb={gap}>Komentar</Heading>
        <TableContainer>
          <Table size='sm'>
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
      </Flex>
    </>
  );
}
