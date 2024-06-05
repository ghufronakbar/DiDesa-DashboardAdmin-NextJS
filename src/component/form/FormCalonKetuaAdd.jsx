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
  Select,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { primaryColor, white } from "../../lib/color";

export function FormCalonKetuaAdd({ gap }) {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const pemilihan_ketua_id = useRef();
  const warga_id = useRef();
  const deskripsi = useRef();

  const toast = useToast();
  const { data, refetch: refetchData } = useQuery({
    queryKey: ["warga"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/warga");
      setLoading(false);
      return dataResponse;
    },
  });

  const handleAdd = async () => {
    try {
      const formData = {
        pemilihan_ketua_id: router.query.id,
        warga_id: warga_id.current.value,
        deskripsi: deskripsi.current.value,
      };

      const response = await axiosInstance.post(`/calonketua/add`, formData);

      toast({
        title: response.data.message,
        status: "success",
      });
      router.push(`/admin/pemilihankepaladesa/${id}`);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error rejecting request:", error);
    }
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <Flex direction="column" w="100%" m={gap}>
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
                    <Th>Warga</Th>
                    <Td>
                      <FormControl>
                        <Select
                          name="warga_id"
                          placeholder="Pilih Warga"
                          ref={warga_id}
                        >
                          {data?.data.values.map((warga) => (
                            <option key={warga.warga_id} value={warga.warga_id}>
                              {warga.nama_lengkap}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Td>
                  </Tr>

                  <Tr>
                    <Th>Deskripsi</Th>
                    <Td>
                      <FormControl>
                        <Textarea required name="deskripsi" ref={deskripsi} />
                      </FormControl>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
            <Center mt={4}>
              <Button
                variant="outline"
                bg={primaryColor}
                color={white}
                onClick={() => {
                  handleAdd();
                }}
              >
                Submit
              </Button>
            </Center>
          </Box>
        </form>
      </Flex>
    </>
  );
}
