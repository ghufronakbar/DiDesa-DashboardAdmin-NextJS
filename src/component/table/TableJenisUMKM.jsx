import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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
  Input,
  ModalFooter,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

export function TableJenisUMKM({ refetchData: customRefetchData }) {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namaJenisUMKM, setNamaJenisUMKM] = useState("");
  const [editedJenisUMKMId, setEditedJenisUMKMId] = useState(null);

  const { data, refetch: refetchData } = useQuery({
    queryKey: ["jenisumkm"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/jenisumkm");
      return dataResponse;
    },
  });

  let i = 1;
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/jenisumkm/delete/${id}`);

      toast({
        title: "Jenis UMKM has been deleted",
        status: "warning",
      });
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/jenisumkm/edit/${editedJenisUMKMId}`, {
        nama_jenis_umkm: namaJenisUMKM,
      });

      toast({
        title: "Jenis UMKM has been edited",
        status: "success",
      });
      refetchData();
      setIsModalOpen(false);
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
            <Th>Jenis UMKM</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.values.map((data) => (
            <Tr key={data.jenis_umkm_id}>
              <Td>{i++}</Td>
              <Td>
                <HStack>
                  <Text as="b" marginRight={2}>
                    {data.nama_jenis_umkm}
                  </Text>

                  <EditIcon
                    as="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditedJenisUMKMId(data.jenis_umkm_id);
                      setNamaJenisUMKM(data.nama_jenis_umkm);
                    }}
                  />
                </HStack>
              </Td>

              <Td>
                <Center marginTop={1}>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(data.jenis_umkm_id)}
                  >
                    <Text as="b">Delete</Text>
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
          <ModalHeader>Edit Nama</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center flex={1}>
                <form onSubmit={handleEdit}>
                 
                  <FormControl>
                    <Input
                      name="nama_jenis_umkm"
                      value={namaJenisUMKM}
                      onChange={(e) => setNamaJenisUMKM(e.target.value)}
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
                      Update
                    </Button>
                  </Center>
                </form>
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
}
