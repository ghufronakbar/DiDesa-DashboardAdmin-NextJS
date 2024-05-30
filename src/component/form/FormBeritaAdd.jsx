import {
    Box,
    Button,
    Center,
    FormControl,
    Image,
    Input,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Tr,
    Textarea,
    useToast,
    Flex,
  } from "@chakra-ui/react";
  import { axiosInstance } from "../../lib/axios";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/router";
  import { useRef } from "react";
  
  export function FormBeritaAdd() {
    const router = useRouter();
 
    const judulRef = useRef();
    const subjudulRef = useRef();
    const isiRef = useRef();
    const gambarRef = useRef();
    const toast = useToast();
  
  
  
    const handleAdd = async () => {
      try {
        const formData = new FormData();
        formData.append("judul", judulRef.current.value);
        formData.append("subjudul", subjudulRef.current.value);
        formData.append("isi", isiRef.current.value);
        formData.append("gambar", gambarRef.current.files[0]);
  
        const response = await axiosInstance.post(`/berita/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast({
          title: response.data.message,
          status: "success",
        });
        router.push(`/admin/berita`);
      } catch (error) {
        console.error("Error adding berita:", error);
        toast({
          title: error.response.data.message || "Failed to add berita",
          status: "error",
        });
      }
    };
  
    return (
      <>
       
          <form>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mt={4}
            >
              <Flex>
                <Table flex={5}>
                  <Tbody>
                    <Tr>
                      <Th>Judul</Th>
                      <Td>
                        <FormControl >
                          <Input
                
                            ref={judulRef}
                            name="judul"
                          ></Input>
                        </FormControl>
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Sub Judul</Th>
                      <Td>
                        <FormControl>
                          <Input
                           required
                            ref={subjudulRef}
                            name="subjudul"
                          ></Input>
                        </FormControl>
                      </Td>
                    </Tr>
                 
                  </Tbody>
                </Table>
  
                <Spacer flex={1} />
  
                <Box
                  p={8}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  mt={4}
                  flex={4}
                >
                  <Center>
                    <Image
                      borderRadius="18"
                      objectFit="cover"
                      src=""
                      alt=""
                    />
                  </Center>
                  <Input mt={4} type="file" name="gambar" ref={gambarRef} />
                </Box>
              </Flex>
  
              <Textarea
                marginTop={4}
                
                ref={isiRef}
              ></Textarea>
              <Center mt={4}>
                <Button
                  variant="outline"
                  bg="#4FD1C5"
                  color="white"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Tambah Berita
                </Button>
              </Center>
            </Box>
          </form>
      
      </>
    );
  }
  