import {
  Box,
  Button,
  Center,
  Flex,
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

export function TableUMKM() {
  const [selectedUmkmId, setSelectedUmkmId] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/umkm/delete/${id}`);

      toast({
        title: "UMKM has been deleted",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

 

  
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/umkm/approve/${id}`, {
        approve: 2,
        id,
      });
      setIsModalOpen(false);
      toast({
        title: "UMKM has been approved",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleNotApprove = async (id) => {
    try {
      await axiosInstance.put(`/umkm/approve/${id}`, {
        approve: 1,
        id,
      });
      setIsModalOpen(false);
      toast({
        title: "UMKM has been approved",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <TableContainer>
      <Table>
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
                      onClick={()=>{
                        setIsModalOpen(true);
                        setSelectedUmkmId(data.umkm_id);
                      }}
                    >
                      Pending
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
                      onClick={()=>{
                        handleApprove(data.umkm_id)
                      }}
                    >
                      Not Approved
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
                      onClick={()=>{
                        handleNotApprove(data.umkm_id)
                      }}
                    >
                      Not Activated
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
                      onClick={()=>{
                        handleNotApprove(data.umkm_id)
                      }}
                    >
                      Activated
                    </Box>
                  )}
                </Center>
              </Td>

              <Td>
               
                <Center >
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(data.umkm_id)}
                  >
                    Delete
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
          <ModalHeader>Confirm Request</ModalHeader>
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
                  Don't Approve
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
                  Approve
                </Button>
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
}
