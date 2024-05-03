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

export function FormCalonKetuaEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nik = useRef();
  const deskripsi = useRef();
  const nama_lengkap = useRef();
  const tanggal_lahir = useRef();
  const foto = useRef();
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

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const handleUpdate = async (id) => {
    try {
      const formData = {
        deskripsi: deskripsi.current.value,
      };

      await axiosInstance.put(`/calonketua/edit/${data.calon_ketua_id}`, formData);

      toast({
        title: "Calon Ketua has been updated",
        status: "success",
      });
      router.push(`/admin/pemilihankepaladesa/${data.pemilihan_ketua_id}`);
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
                          defaultValue={data.deskripsi}
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
    </>
  );
}
