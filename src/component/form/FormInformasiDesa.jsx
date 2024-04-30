import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react"; 
import { useRouter } from "next/router";

export function FormInformasiDesa() {
  const router = useRouter();
  const toast = useToast();
  const namaDesaRef = useRef();
  const luasLahanPertanianRef = useRef();
  const lahanPeternakanRef = useRef();
  const deskripsiRef = useRef();

  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/informasidesa");
      return dataResponse;
    },
  });

  const handleEdit = async () => {
    try {
      const requestData = {
        nama_desa: namaDesaRef.current.value,
        luas_lahan_pertanian: luasLahanPertanianRef.current.value,
        lahan_peternakan: lahanPeternakanRef.current.value,
        deskripsi: deskripsiRef.current.value,
      };
      toast({
        title: "Pengurus Desa has been edited",
        status: "success",
      });
      await axiosInstance.put(`/informasidesa/edit`, requestData);

      refetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      {data?.data.values.map((data) => (
        <form key={data.id}>
          <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack spacing={4}>
              <Flex>
                <Table flex={1}>
                  <Tbody>
                    <Tr>
                      <Th>
                        <FormLabel>Nama Desa</FormLabel>
                      </Th>
                      <Td>
                        <FormControl>
                          <Input
                            ref={namaDesaRef}
                            defaultValue={data.nama_desa}
                          ></Input>
                        </FormControl>
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>
                        <FormLabel>Luas Lahan Pertanian</FormLabel>
                      </Th>
                      <Td>
                        <NumberInput
                          defaultValue={data.luas_lahan_pertanian}
                          min={0}
                        >
                          <NumberInputField ref={luasLahanPertanianRef} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>
                        <FormLabel>Lahan Peternakan</FormLabel>
                      </Th>
                      <Td>
                        <NumberInput
                          defaultValue={data.lahan_peternakan}
                          min={0}
                        >
                          <NumberInputField ref={lahanPeternakanRef} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <VStack flex={2}>
                  <Table>
                    <Tbody>
                      <Tr>
                        <Th>
                          <FormLabel>Deskripsi</FormLabel>
                        </Th>
                      </Tr>
                      <Tr>
                        <Td>
                          <FormControl>
                            <Textarea
                              defaultValue={data.deskripsi}
                              ref={deskripsiRef}
                            ></Textarea>
                          </FormControl>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </VStack>
              </Flex>
            </Stack>
            <Center>
              <Button bg="#48BB78" color="white" mt={4} onClick={handleEdit}>
                Update
              </Button>
            </Center>
          </Box>
        </form>
      ))}
    </>
  );
}
