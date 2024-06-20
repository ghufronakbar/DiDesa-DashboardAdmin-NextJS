import {
  Button,
  Center,
  Image,
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
  Flex,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loading } from "../Loading";
import formatString from "../../lib/formatString";
import formatDate from "../../lib/formatDate";

export function TablePengaduanMasyarakat({ gap }) {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pengaduanMasyarakatId, setPengaduanMasyarakatId] = useState(null);
  const [subjekPengaduanMasyarakat, setSubjekPengaduanMasyarakat] =
    useState(null);
  const [isiPengaduanMasyarakat, setIsiPengaduanMasyarakat] = useState(null);
  const [isLoading, setIsloading] = useState(true);


  let i = 1;
  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/pengaduanmasyarakat");
      setIsloading(false);
      return dataResponse;
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/pengaduanmasyarakat/delete/${id}`);
      toast({
        title: response?.data?.message,
        status: "info",
      });
      refetchData();
    } catch (error) {
      toast({
        title: error?.response?.data?.message,
        status: "info",
      });
      console.error("Error rejecting request:", error);
    }
  };

  const ModalDetail = () => {
    return (
      <>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="full"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{subjekPengaduanMasyarakat}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Center flex={1}>
                  <Table>
                    <Tr>
                      <Th>Isi Aduan</Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text>{isiPengaduanMasyarakat}</Text>
                      </Td>
                    </Tr>
                  </Table>
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

  return (
    <>
      <Flex direction="column" m={gap} w="100%">
        <Heading mb={gap}>Pengaduan Masyarakat</Heading>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Warga</Th>
                <Th>Isi Aduan</Th>
                <Th>Tanggal</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.values?.map((item) => (
                <Tr key={item.pengaduan_masyarkat_id}>
                  <Td>{i++}</Td>

                  <Td>
                    <Text as="b">{item.nama_lengkap}</Text>
                    <Text>{item.nik}</Text>
                  </Td>
                  <Td maxW={40}>
                    <Text as="b">{item.subjek}</Text>
                    <Tooltip
                      hasArrow
                      label={item.isi}
                      bg="gray.300"
                      color="black"
                    >
                      <Text>{formatString(item.isi, 30)}</Text>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Text as="b">{formatDate(item.tanggal)}</Text>
                  </Td>
                  <Td>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="grey"
                        variant="outline"
                        onClick={() => {
                          setIsModalOpen(true);
                          setPengaduanMasyarakatId(item.pengaduan_masyarkat_id);
                          setSubjekPengaduanMasyarakat(item.subjek);
                          setIsiPengaduanMasyarakat(item.isi);
                        }}
                      >
                        Detail
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          handleDelete(item.pengaduan_masyarakat_id)
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
          {ModalDetail()}
        </TableContainer>
      </Flex>
    </>
  );
}
