import {
  Box,
  Button,
  Center,
  Flex,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Select,
  Heading,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loading } from "../Loading";

export function TablePengurusDesa({ gap }) {
  const router = useRouter();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pengurusDesaWargaId, setPengurusDesaWargaId] = useState(null);
  const [pengurusDesaJabatan, setPengurusDesaJabatan] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  let i = 1;

  const { data: data, refetch: refetchData } = useQuery({
    queryKey: ["pengurusdesa"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/pengurusdesa");
      setIsloading(false);
      return dataResponse;
    },
  });

  const { data: dataWarga, refetch: refetchDataWarga } = useQuery({
    queryKey: ["warga"],
    queryFn: async () => {
      const dataWargaResponse = await axiosInstance.get("/warga");
      setIsloading(false);
      return dataWargaResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/pengurusdesa/delete/${id}`);
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

  const handleDetail = (id) => {
    router.push(`/admin/pengurusdesa/${id}`);
  };

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

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/pengurusdesa/add`, {
        warga_id: pengurusDesaWargaId,
        jabatan: pengurusDesaJabatan,
      });
      toast({
        title: response.data.message,
        status: "success",
      });
      setIsModalOpen(false);
      setPengurusDesaJabatan(null)
      setPengurusDesaWargaId(null)
      refetchData();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
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
      <Flex m={gap} direction="column" w="100%">
        <Flex mb={gap}>
          <Heading>Pengurus Desa</Heading>
          <Spacer />
          <Box
            as="button"
            borderRadius="md"
            bg="#48BB78"
            color="white"
            px={4}
            h={8}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Pengurus Desa
          </Box>
        </Flex>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th></Th>
                <Th>Nama Lengkap</Th>
                <Th>Jabatan</Th>
                <Th>Akses Admin</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data.values.map((data) => (
                <Tr key={data.pengurus_desa_anggota_id}>
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
                    <Text>{data.nik}</Text>
                  </Td>
                  <Td>
                    <Text>{data.jabatan}</Text>
                  </Td>
                  <Td>
                    <Center>
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
                            handleNonAdmin(data.pengurus_desa_anggota_id);
                          }}
                        >
                          Not Admin
                        </Box>
                      )}
                    </Center>
                  </Td>

                  <Td>
                    <Center>
                      <Button
                        variant="outline"
                        colorScheme="grey"
                        onClick={() =>
                          handleDetail(data.pengurus_desa_anggota_id)
                        }
                      >
                        <Text as="b">Detail</Text>
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          handleDelete(data.pengurus_desa_anggota_id)
                        }
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
      <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)
        setPengurusDesaWargaId(null)
        setPengurusDesaJabatan(null)
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Pengurus</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center flex={1}>
                <form onSubmit={handleAdd}>
                  <FormControl m={4}>
                    <Select
                      name="warga_id"
                      placeholder="Pilih Warga"
                      onChange={(e) => setPengurusDesaWargaId(e.target.value)}
                    >
                      {dataWarga?.data.values.map((warga) => (
                        <option key={warga.warga_id} value={warga.warga_id}>
                          {warga.nama_lengkap}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl m={4}>
                    <Input
                      name="jabatan"
                      placeholder="Jabatan"
                      value={pengurusDesaJabatan}
                      onChange={(e) => setPengurusDesaJabatan(e.target.value)}
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
                      Add
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
