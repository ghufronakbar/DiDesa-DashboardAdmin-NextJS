import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useState } from "react";
import { Loading } from "../Loading";

export function TableUMKM({ gap }) {
  const [selectedUmkmId, setSelectedUmkmId] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const dataResponse = await axiosInstance.get("/umkm");
      setIsloading(false)
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/umkm/delete/${id}`);

      toast({
        title: response.data.message,
        status: "warning",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "warning",
      });
      console.error("Error rejecting request:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axiosInstance.put(`/umkm/approve/${id}`, {
        approve: 2,
        id,
      });
      setIsModalOpen(false);
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleNotApprove = async (id) => {
    try {
      const response = await axiosInstance.put(`/umkm/approve/${id}`, {
        approve: 1,
        id,
      });
      setIsModalOpen(false);
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
        <Heading mb={gap}>UMKM</Heading>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th></Th>
                <Th>Nama</Th>
                <Th>Lokasi</Th>
                <Th>Pemilik</Th>
                <Th>Status</Th>
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
                    <Text as="b">{data.nama}</Text>
                    <Text>{data.nama_jenis_umkm}</Text>
                  </Td>
                  <Td>
                    <Text>{data.lokasi}</Text>
                  </Td>
                  <Td>
                    <Text>{data.nama_lengkap}</Text>
                  </Td>
                  <Td>
                    <Center>
                      {data.approve == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#CBD5E0"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedUmkmId(data.umkm_id);
                          }}
                        >
                          Menunggu
                        </Box>
                      )}

                      {data.approve == 1 && data.status == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#E53E3E"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            handleApprove(data.umkm_id);
                          }}
                        >
                          Tidak Disetujui
                        </Box>
                      )}

                      {data.approve == 2 && data.status == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#0063d1"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            handleNotApprove(data.umkm_id);
                          }}
                        >
                          Tidak Aktif
                        </Box>
                      )}
                      {data.approve == 2 && data.status == 1 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#48BB78"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            handleNotApprove(data.umkm_id);
                          }}
                        >
                          Aktif{" "}
                        </Box>
                      )}
                    </Center>
                  </Td>

                  <Td>
                    <Center>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(data.umkm_id)}
                      >
                        Hapus
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Konfirmasi Permintaan</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex>
                  <Center flex={1}>
                    <Button
                      borderRadius="md"
                      bg="#E53E3E"
                      color="white"
                      px={4}
                      h={8}
                      onClick={() => handleNotApprove(selectedUmkmId)}
                    >
                      Tolak
                    </Button>
                  </Center>
                  <Center flex={1}>
                    <Button
                      borderRadius="md"
                      bg="#48BB78"
                      color="white"
                      px={4}
                      h={8}
                      onClick={() => handleApprove(selectedUmkmId)}
                    >
                      Setujui
                    </Button>
                  </Center>
                </Flex>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </TableContainer>
      </Flex>
    </>
  );
}
