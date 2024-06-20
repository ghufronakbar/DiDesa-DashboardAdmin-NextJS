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
import { primaryColor, red, secondaryColor, tersierColor, white } from "../../lib/color";

export function TableUMKM({ gap }) {
  const [selectedUmkmId, setSelectedUmkmId] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(true)

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
        title: response?.data?.message,
        status: "info",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error?.response?.data?.message,
        status: "error",
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
        status: "info",
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
              {data?.data.values.map((item) => (
                <Tr key={item.umkm_id}>
                  <Td>{i++}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      src={item.gambar}
                      alt={item.gambar}
                    />
                  </Td>
                  <Td>
                    <Text as="b">{item.nama}</Text>
                    <Text>{item.nama_jenis_umkm}</Text>
                  </Td>
                  <Td>
                    <Text>{item.lokasi}</Text>
                  </Td>
                  <Td>
                    <Text>{item.nama_lengkap}</Text>
                  </Td>
                  <Td>
                    <Center>
                      {item.approve == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg={tersierColor}
                          color={white}
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedUmkmId(item.umkm_id);
                          }}
                        >
                          Menunggu
                        </Box>
                      )}

                      {item.approve == 1 && item.status == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg={red}
                          color={white}
                          px={4}
                          h={8}
                          onClick={() => {
                            handleApprove(item.umkm_id);
                          }}
                        >
                          Tidak Disetujui
                        </Box>
                      )}

                      {item.approve == 2 && item.status == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg={secondaryColor}
                          color={white}
                          px={4}
                          h={8}
                          onClick={() => {
                            handleNotApprove(item.umkm_id);
                          }}
                        >
                          Tidak Aktif
                        </Box>
                      )}
                      {item.approve == 2 && item.status == 1 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg={primaryColor}
                          color={white}
                          px={4}
                          h={8}
                          onClick={() => {
                            handleNotApprove(item.umkm_id);
                          }}
                        >
                          Aktif
                        </Box>
                      )}
                    </Center>
                  </Td>

                  <Td>
                    <Center>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(item.umkm_id)}
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
                      bg={secondaryColor}
                      color={white}
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
                      bg={primaryColor}
                      color={white}
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
