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
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Loading } from "../Loading";

export function TableJenisUMKM({ refetchData: customRefetchData, gap }) {
  const toast = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [namaJenisUMKM, setNamaJenisUMKM] = useState("");
  const [editedJenisUMKMId, setEditedJenisUMKMId] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const { data, refetch: refetchData } = useQuery({
    queryKey: ["jenisumkm"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/jenisumkm");
      setIsloading(false);
      return dataResponse;
    },
  });

  const handleAdd = async () => {
    try {
      const response = await axiosInstance.post(`/jenisumkm/add/`, {
        nama_jenis_umkm: namaJenisUMKM,
      });

      toast({
        title: response.data.message,
        status: "success",
      });

      setIsAddOpen(false);
      setNamaJenisUMKM("");
      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  let i = 1;
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/jenisumkm/delete/${id}`);

      toast({
        title: response.data.message,
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
      const response = await axiosInstance.put(
        `/jenisumkm/edit/${editedJenisUMKMId}`,
        {
          nama_jenis_umkm: namaJenisUMKM,
        }
      );
      toast({
        title: response.data.message,
        status: "success",
      });
      refetchData();
      setNamaJenisUMKM("");
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const ModalAdd = () => {
    return (
      <>
        <Modal
          isOpen={isAddOpen}
          onClose={() => {
            setIsAddOpen(false);
            setNamaJenisUMKM("");
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nama Jenis UMKM</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Center flex={1}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAdd();
                    }}
                  >
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
                        Tambah
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
  };

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  const ModalEdit = () => {
    return (
      <>
        <Modal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setNamaJenisUMKM("");
          }}
        >
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
                        Edit
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
  };
  return (
    <>
      <Flex m={gap} direction="column" w="100%">
        <Flex mb={gap}>
          <Heading>Jenis UMKM</Heading>
          <Spacer />
          <Box
            as="button"
            borderRadius="md"
            bg="#48BB78"
            color="white"
            px={4}
            h={10}
            colorScheme="teal"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            Tambah Jenis UMKM
          </Box>
        </Flex>
        <TableContainer>
          <Table size="sm">
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
                          setIsEditOpen(true);
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
                        <Text as="b">Hapus</Text>
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      {ModalEdit()}
      {ModalAdd()}
    </>
  );
}
