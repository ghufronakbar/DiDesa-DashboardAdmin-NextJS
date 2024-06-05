import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
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
import { Loading } from "../Loading";
import { useState } from "react";
import formatDate from "../../lib/formatDate";
import { primaryColor, white } from "../../lib/color";

export function TableWarga({ gap }) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true)

  let i = 1;
  const { data: dataWarga, refetch: refetchDataWarga } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/warga");
      setIsloading(false)
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/warga/delete/${id}`);      
      toast({
        title: response.data.message,
        status: "info",
      });
      refetchDataWarga();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/warga/${id}`);
  };

  if(isLoading)return(<><Loading/></>)

  return (
    <>
      <Flex m={gap} w="100%" direction="column">
        <Flex mb={gap}>
          <Heading>Warga</Heading>
          <Spacer/>
          <Box
            as="button"
            borderRadius="md"
            bg={primaryColor}
            color={white}
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
          <Table size='sm'>
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
              {dataWarga?.data.values.map((data) => (
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
      </Flex>
    </>
  );
}
