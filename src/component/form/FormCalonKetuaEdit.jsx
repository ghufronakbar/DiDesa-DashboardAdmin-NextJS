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
import { Loading } from "../Loading";
import formatDate from "../../lib/formatDate";

export function FormCalonKetuaEdit({gap}) {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);  
  const deskripsi = useRef();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const reqDataResponse = await axiosInstance.get(
            `/calonketua/detail/${id}`
          );
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
        deskripsi: deskripsi.current.value,
      };

      const response = await axiosInstance.put(`/calonketua/edit/${data.calon_ketua_id}`, formData);

      toast({
        title: response.data.message,
        status: "success",
      });
      router.push(`/admin/pemilihankepaladesa/${data.pemilihan_ketua_id}`);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error approving request:", error);
    }
  };

  if (loading) return <Loading/>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
    <Flex direction="column" w="100%" m={gap}>
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
                    <Th>Nama Lengkap</Th>
                    <Td>
                      <FormControl>{data.namalengkap}</FormControl>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>NIK</Th>
                    <Td>
                      <FormControl>{data.nik}</FormControl>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Tanggal Lahir</Th>
                    <Td>
                      <FormControl>
                        {formatDate(data.tanggal_lahir)}
                      </FormControl>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Deskripsi</Th>
                    <Td>
                      <FormControl>
                        <Input
                          required
                          ref={deskripsi}
                          name="kk"
                          defaultValue={data.deskripsi_calon}                          
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
                    src={data.foto}
                    alt={data.foto}
                  />
                </Center>
              </Box>
            </Flex>

            <Center mt={4}>
              <Button
                variant="outline"
                bg="#4FD1C5"
                color="white"
                onClick={() => {
                  handleUpdate(data.warga_id);
                }}
              >
                Update
              </Button>
            </Center>
          </Box>
        </form>
      )}
    </Flex>
    </>
  );
}
