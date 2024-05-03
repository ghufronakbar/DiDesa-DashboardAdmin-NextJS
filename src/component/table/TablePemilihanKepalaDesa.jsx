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
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export function TablePemilihanKepalaDesa() {
  const router = useRouter();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
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

  const handleAddPemilihanKetua = async (e) => {
    e.preventDefault();
    try {
      if (tanggalMulai > tanggalSelesai) {
        toast({
          title: "Tanggal mulai harus lebih dulu tanggal selesai",
          status: "error",
        });
      } else if (tanggalMulai < tanggalSelesai) {
        await axiosInstance.post(`/pemilihankepaladesa/add`, {
          judul: judul,
          deskripsi: deskripsi,
          tanggal_mulai: tanggalMulai,
          tanggal_selesai: tanggalSelesai,
        });
        toast({
          title: "Pemilihan Kepala Desa has been inserted",
          status: "success",
        });
        refetchData();
        setIsModalOpen(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Penanganan kesalahan jika tanggal mulai dan tanggal selesai bertabrakan
        toast({
          title:
            "Tanggal mulai tidak boleh yang sudah lewat dan tidak boleh bertabrakan dengan pemilihan lain",
          status: "error",
        });
      } else {
        console.error("Error rejecting request:", error);
      }
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/pemilihankepaladesa/${id}`);
  };

  return (
    <>
      <Flex>
        <Spacer flex={4} />  
          <Box
            as="button"
            borderRadius="md"
            bg="#48BB78"
            color="white"
            px={4}
            h={8}
            marginRight={4}
            onClick={() => {
             setIsModalOpen(true)
            }}
          >
            Add Pemilihan Ketua
          </Box>
       
      </Flex>
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
      <Modal
        size="xl"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Pemilihan Ketua</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAddPemilihanKetua}>
              <FormControl m={2}>
                <Input
                  name="judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
              </FormControl>
              <FormControl m={2}>
                <Textarea
                  name="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </FormControl>
              <FormControl m={2}>
                <Input
                  type="date"
                  name="tanggal_mulai"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                />
              </FormControl>
              <FormControl m={2}>
                <Input
                  type="date"
                  name="tanggal_selesai"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                />
              </FormControl>
              <Center>
                <Button
                  mt={8}
                  borderRadius="md"
                  bg="#48BB78"
                  color="white"
                  px={4}
                  h={8}
                  type="submit"
                >
                  Submit
                </Button>
              </Center>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}