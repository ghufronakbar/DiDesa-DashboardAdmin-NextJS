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

export function FormWargaEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nik = useRef();
  const kk = useRef();
  const nama_lengkap = useRef();
  const tanggal_lahir = useRef();
  const foto = useRef();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const reqDataResponse = await axiosInstance.get(`/warga/${id}`);
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
        nik: nik.current.value,
        kk: kk.current.value,
        nama_lengkap: nama_lengkap.current.value,
        tanggal_lahir: tanggal_lahir.current.value,
      };

      if (foto.current.files.length > 0) {
        formData.foto = foto.current.value;
      }

      console.log(foto.current.files.length)

      await axiosInstance.put(`/warga/edit/${id}`, formData);

      toast({
        title: "Warga has been updated",
        status: "success",
      });
      router.push(`/admin/warga`);
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
                    <Th>NIK</Th>
                    <Td>
                      <FormControl>
                        <Input
                          ref={nik}
                          name="nik"
                          defaultValue={data.nik}
                        ></Input>
                      </FormControl>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>KK</Th>
                    <Td>
                      <FormControl>
                        <Input
                          required
                          ref={kk}
                          name="kk"
                          defaultValue={data.kk}
                        ></Input>
                      </FormControl>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Nama Lengkap</Th>
                    <Td>
                      <FormControl>
                        <Input
                          required
                          ref={nama_lengkap}
                          name="nama_lengkap"
                          defaultValue={data.nama_lengkap}
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
                          ref={tanggal_lahir}
                          defaultValue={
                            data.tanggal_lahir == "0000-00-00"
                              ? ""
                              : new Date(data.tanggal_lahir)
                                  .toISOString()
                                  .split("T")[0]
                          }
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
                    src={data.foto}
                    alt={data.foto}
                  />
                </Center>
                <Input mt={4} type="file" name="gambar" ref={foto} />
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
