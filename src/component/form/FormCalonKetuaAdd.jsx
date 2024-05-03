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

export function FormCalonKetuaAdd() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const pemilihan_ketua_id = useRef();
  const warga_id = useRef();
  const deskripsi = useRef();

  const toast = useToast();
  const { data, refetch: refetchData } = useQuery({
    queryKey:["warga"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/warga");
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

      await axiosInstance.post(`/calonketua/add`, formData);

      toast({
        title: "Calon Ketua has been inserted",
        status: "success",
      });
      router.push(`/admin/pemilihankepaladesa/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Penanganan kesalahan jika tanggal mulai dan tanggal selesai bertabrakan
        toast({
          title:
            "Warga sudah terdaftar sebagai calon di pemilihan ini",
          status: "error",
        });
      } else {
        console.error("Error rejecting request:", error);
      }
    }
  };

  return (
    <>
      <form>
        <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4}>
          <Flex>
            <Table flex={5}>
              <Tbody>
                <Tr>
                  <Th>Warga</Th>
                  <Td>
                    <FormControl>
                      <Select name="warga_id" placeholder="Pilih Warga" ref={warga_id}>
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
              bg="#4FD1C5"
              color="white"
              onClick={() => {
                handleAdd();
              }}
            >
              Submit
            </Button>
          </Center>
        </Box>
      </form>
    </>
  );
}
