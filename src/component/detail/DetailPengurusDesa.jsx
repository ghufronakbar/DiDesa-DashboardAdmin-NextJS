import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Flex,
  Text,
  useToast,
  Spacer,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EditIcon } from "@chakra-ui/icons";
import { Loading } from "../Loading";

export function DetailPengurusDesa({ gap }) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const [editedPengurusDesaId, setEditedPengurusDesaId] = useState(null);
  const [editedJabatanPengurusDesa, setJabatanPengurusDesa] = useState(null);

  const fetchData = async () => {
    try {
      const reqDataResponse = await axiosInstance.get(`/pengurusdesa/${id}`);
      setData(reqDataResponse.data.values[0]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching detail request data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const refetchData = async () => {
    await fetchData();
  };

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const handleNonAdmin = async (id) => {
    try {
      const response = await axiosInstance.put(`/pengurusdesa/akses/${id}`, {
        akses_admin: 1,
        id,
      });
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error rejecting request:", error);
    }
  };

  const handleAdmin = async (id) => {
    try {
      const response = await axiosInstance.put(`/pengurusdesa/akses/${id}`, {
        akses_admin: 0,
        id,
      });
      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error rejecting request:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(
        `/pengurusdesa/edit/${editedPengurusDesaId}`,
        {
          jabatan: editedJabatanPengurusDesa,
        }
      );
      setIsModalOpen(false);
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error rejecting request:", error);
    }
  };

  if (loading) return <Loading/>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <Flex w="100%" m={gap} direction="column">
        {data && (
          <Box>
            <Flex marginTop={8}>
              <Spacer />
              <Box flex={4} mt={4}>
                <Box
                  p={8}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  {" "}
                  <Center>
                    {" "}
                    <Text as="b" mb={4}>
                      PENGURUS DESA
                    </Text>
                  </Center>
                  <Box>
                    <Box
                      p={8}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Center>
                        <Image
                          borderRadius="18"
                          boxSize="120px"
                          objectFit="cover"
                          src={data.foto}
                          alt={data.foto}
                        />
                      </Center>

                      <Flex mt={4}>
                        <Table>
                          <Tr>
                            <Th>Jabatan</Th>
                            <Td>
                              {data.jabatan}{" "}
                              <EditIcon
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setEditedPengurusDesaId(
                                    data.pengurus_desa_anggota_id
                                  );
                                  setJabatanPengurusDesa(data.jabatan);
                                }}
                              />
                            </Td>
                          </Tr>
                          <Tr>
                            <Th>Akses Admin</Th>
                            <Td>
                              {data.akses_admin == 1 ? (
                                <Box
                                  as="button"
                                  borderRadius="md"
                                  bg="#48BB78"
                                  color="white"
                                  px={4}
                                  h={8}
                                  onClick={() => {
                                    handleAdmin(data.pengurus_desa_anggota_id);
                                  }}
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
                                  onClick={() => {
                                    handleNonAdmin(
                                      data.pengurus_desa_anggota_id
                                    );
                                  }}
                                >
                                  Not Admin
                                </Box>
                              )}
                            </Td>
                          </Tr>
                        </Table>
                      </Flex>
                    </Box>
                    <TableContainer p={8}>
                      <Table>
                        <Tbody>
                          <Tr>
                            <Th>Nama Lengkap</Th>
                            <Td>{data.nama_lengkap}</Td>
                          </Tr>
                          <Tr>
                            <Th>NIK</Th>
                            <Td>{data.nik}</Td>
                          </Tr>

                          <Tr>
                            <Th>Tanggal Lahir</Th>
                            <Td>{formatDate(data.tanggal_lahir)}</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Box>
              <Spacer />
            </Flex>
          </Box>
        )}
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Jabatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center flex={1}>
                <form onSubmit={handleEdit}>
                  <FormControl>
                    <Input
                      name="jabatan"
                      value={editedJabatanPengurusDesa}
                      onChange={(e) => setJabatanPengurusDesa(e.target.value)}
                    />
                  </FormControl>
                  <Center>
                    <Button
                      mt={4}
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      type="submit"
                    >
                      Perbarui
                    </Button>
                  </Center>
                </form>
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
