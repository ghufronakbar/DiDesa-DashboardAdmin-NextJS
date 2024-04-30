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

export function FormBerita() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const judulRef = useRef();
  const subjudulRef = useRef();
  const tanggalRef = useRef();
  const isiRef = useRef();
  const gambarRef = useRef();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const reqDataResponse = await axiosInstance.get(`/berita/${id}`);
          setData(reqDataResponse.data.values[0]);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.error("Error fetching detail request data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleUpdate = async (id) => {
    try {
      const formData = {
        judul: judulRef.current.value,
        subjudul: subjudulRef.current.value,
        tanggal: tanggalRef.current.value,
        isi: isiRef.current.value,
      };
  
      // Periksa apakah ada file gambar yang diunggah
      if (gambarRef.current.files.length > 0) {
        // Jika ada, tambahkan properti gambar ke formData
        formData.gambar = gambarRef.current.value;
      }
  
      await axiosInstance.put(`/berita/edit/${id}`, formData);
  
      toast({
        title: "Berita has been updated",
        status: "success",
      });
      router.push(`/admin/berita`);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {data && (
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
                      <FormControl>
                        <Input
                          defaultValue={data.judul}
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
                          defaultValue={data.subjudul}
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
                          defaultValue={
                            data.tanggal == '0000-00-00'
                              ?'': new Date(data.tanggal)
                                  .toISOString()
                                  .split("T")[0]
                              
                          }
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
                    src={data.gambar}
                    alt={data.gambar}
                  />
                </Center>
                <Input mt={4} type="file" name="gambar" ref={gambarRef} />
              </Box>
            </Flex>

            <Textarea
              marginTop={4}
              defaultValue={data.isi}
              ref={isiRef}
            ></Textarea>
            <Center mt={4}>
              <Button
                variant="outline"
                bg="#4FD1C5"
                color="white"
                onClick={() => {
                  handleUpdate(data.berita_id);
                }}
              >
                Update
              </Button>
            </Center>
          </Box>
        </form>
      )}
    </>
  );
}
