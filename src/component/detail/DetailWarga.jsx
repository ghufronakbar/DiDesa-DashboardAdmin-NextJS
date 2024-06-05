import {
  Box,
  Button,
  Center,
  Table,
  Flex,
  Text,
  useToast,
  Spacer,
  Tbody,
  Tr,
  TableContainer,
  Th,
  Td,
  Image,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import formatDate from "../../lib/formatDate";

export function DetailWarga({gap}) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(`/warga/${id}`);
        setRequestData(reqDataResponse.data.values[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching detail request data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <Loading/>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
    <Flex direction='column' m={gap} w='100%'>
      {data && (
        <Box>
          <Flex>
            <Spacer />
            <Box flex={4} mt={4}>
              <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Center>
                  <Image
                    borderRadius="18"
                    boxSize="120px"
                    objectFit="cover"
                    src={data.foto}
                    alt={data.foto}
                  />
                </Center>
                <Box mt={4}>
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>NIK</Th>
                          <Td>{data.nik}</Td>
                        </Tr>
                        <Tr>
                          <Th>KK</Th>
                          <Td>{data.kk}</Td>
                        </Tr>
                        <Tr>
                          <Th>Tanggal Lahir</Th>
                          <Td>{formatDate(data.tanggal_lahir)}</Td>
                        </Tr>
                        <Tr>
                          <Th>Hak Pilih</Th>
                          <Td>
                            {data.hak_pilih == 0 && (
                              <Box
                                as="button"
                                borderRadius="md"
                                bg="#E53E3E"
                                color="white"
                                px={4}
                                h={8}
                                margin={1}
                              >
                                Tidak
                              </Box>
                            )}
                            {data.hak_pilih == 1 && (
                              <Box
                                as="button"
                                borderRadius="md"
                                bg="#48BB78"
                                color="white"
                                px={4}
                                h={8}
                                margin={1}
                              >
                                Iya
                              </Box>
                            )}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>UMKM</Th>
                          <Td>{data.umkm.length}</Td>
                        </Tr>
                        <Tr>
                          <Td>
                            {data.umkm.map((umkm) => (
                              <Box
                                as="button"
                                borderRadius="md"
                                bg="#48BB78"
                                color="white"
                                px={4}
                                margin={1}
                              >
                                <Text as="b">{umkm.nama}</Text>
                                <Text>{umkm.nama_jenis_umkm}</Text>
                              </Box>
                            ))}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Center>
                    {" "}
                    <Button
                      mt={4}
                      variant="outline"
                      bg="#4FD1C5"
                      color="white"
                      onClick={() => {
                        router.push(`/admin/warga/edit/${id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </Center>
                </Box>
              </Box>
            </Box>
            <Spacer />
          </Flex>
        </Box>
      )}

    </Flex>
    </>
  );
}
