import React, { useState } from "react";
import {
  useDisclosure,
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Button,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Center,
  useToast,
  useQuery,
} from "@chakra-ui/react";
import { Navbar } from "../../../../component/NavbarAdmin";
import { TableJenisUMKM } from "../../../../component/table/TableJenisUMKM";
import { axiosInstance } from "../../../../lib/axios";

export default function JenisUMKM() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [namaJenisUMKM, setNamaJenisUMKM] = useState("");
  const toast = useToast();

  const { data, refetch: refetchData } = useQuery({
    queryKey: ["jenisumkm"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/jenisumkm");
      return dataResponse;
    },
  });

  const handleAdd = async () => {
    try {
      await axiosInstance.post(`/jenisumkm/add/`, {
        nama_jenis_umkm: namaJenisUMKM,
      });

      toast({
        title: "Jenis UMKM has been inserted",
        status: "success",
      });

      onClose();

      location.reload()
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      <main>
        {Navbar()}
        <Container maxW="80%">
          <Flex marginBottom="8" marginTop="8">
            <Heading flex={2}>Jenis UMKM</Heading>
            <Spacer flex={8} />
            <Box
              as="button"
              borderRadius="md"
              bg="#48BB78"
              color="white"
              px={4}
              h={10}
              colorScheme="teal"
              onClick={onOpen}
            >
              Jenis UMKM
            </Box>
          </Flex>
          <TableJenisUMKM refetchData={refetchData} />
        </Container>
      </main>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nama Jenis UMKM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center flex={1}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission
                    handleAdd(); // Call handleAdd function
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
