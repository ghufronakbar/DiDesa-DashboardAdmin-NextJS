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
 
    const [loading] = useState(true);
    const [error] = useState(null);
    const judulRef = useRef();
    const subjudulRef = useRef();
    const tanggalRef = useRef();
    const isiRef = useRef();
    const gambarRef = useRef();
    const toast = useToast();
  
  
  
    const handleAdd = async () => {
      try {
        const formData = {
          judul: judulRef.current.value,
          subjudul: subjudulRef.current.value,
          tanggal: tanggalRef.current.value,
          isi: isiRef.current.value,
          gambar: gambarRef.current.value
        };
  
        await axiosInstance.post(`/berita/add`, formData);
  
        toast({
          title: "Berita has been inserted",
          status: "success",
        });
        router.push(`/admin/berita`);
      } catch (error) {
        console.error("Error approving request:", error);
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
                    <Tr>
                      <Th>Tanggal</Th>
                      <Td>
                        <FormControl>
                          <Input
                            name="tanggal"
                            type="date"
                         
                            ref={tanggalRef}
                          />
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
                  Update
                </Button>
              </Center>
            </Box>
          </form>
      
      </>
    );
  }
  