import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { primaryColor, white } from "../../lib/color";

export function FormInformasiDesa({ gap }) {  
  const toast = useToast();
  const namaDesaRef = useRef();
  const luasLahanPertanianRef = useRef();
  const lahanPeternakanRef = useRef();
  const deskripsiRef = useRef();
  const [isLoading, setIsloading] = useState(true)


  const { data, refetch: refetchData } = useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/informasidesa");
      setIsloading(false)
      return dataResponse;
    },
  });


  if(isLoading)return(<><Loading/></>)

  const handleEdit = async () => {
    try {
      const requestData = {
        nama_desa: namaDesaRef.current.value,
        luas_lahan_pertanian: luasLahanPertanianRef.current.value,
        lahan_peternakan: lahanPeternakanRef.current.value,
        deskripsi: deskripsiRef.current.value,
      };
      const response = await axiosInstance.put(`/informasidesa/edit`, requestData);

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

  return (
    <>
      <Flex direction="column" m={gap} w="100%">
        <Heading w="100%" mb={gap}>
          Informasi Desa
        </Heading>
        {data?.data.values.map((data) => (
          <form key={data.id} style={{ width: "100%" }}>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              w="100%"
            >
              <Stack spacing={4} w="100%">
                <Flex w="100%">
                  <Table flex={1} w="100%">
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
                            />
                          </FormControl>
                        </Td>
                      </Tr>
                      <Tr>
                        <Th>
                          <FormLabel>Luas Lahan Pertanian</FormLabel>
                        </Th>
                        <Td>
                          <NumberInput
                            min={0}
                            defaultValue={data.luas_lahan_pertanian}
                          >
                            <NumberInputField
                              ref={luasLahanPertanianRef}
                              defaultValue={data.luas_lahan_pertanian}
                            />
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
                            min={0}
                            defaultValue={data.lahan_peternakan}
                          >
                            <NumberInputField
                              ref={lahanPeternakanRef}
                              defaultValue={data.lahan_peternakan}
                            />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <VStack flex={2} w="100%">
                    <Table w="100%">
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
                              />
                            </FormControl>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </VStack>
                </Flex>
              </Stack>
              <Center>
                <Button bg={primaryColor} color={white} mt={4} onClick={handleEdit}>
                  Update
                </Button>
              </Center>
            </Box>
          </form>
        ))}
      </Flex>
    </>
  );
}
