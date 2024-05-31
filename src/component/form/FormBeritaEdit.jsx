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
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export function FormBeritaEdit({ gap }) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const judulRef = useRef();
  const subjudulRef = useRef();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("judul", judulRef.current.value);
      formData.append("subjudul", subjudulRef.current.value);
      formData.append("isi", isiRef.current.value);

      if (selectedImage) {
        formData.append("gambar", selectedImage);
      }

      const response = await axiosInstance.put(`/berita/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: response.data.message,
        status: "success",
      });
      router.push(`/admin/berita`);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
      console.error("Error updating request:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <Flex m={gap} direction="column" w="100%">
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
                        />
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
                    src={previewImage || data.gambar}
                    alt={data.judul}
                  />
                </Center>
                <Input mt={4} type="file" name="gambar" ref={gambarRef} onChange={handleImageChange} />
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
    </Flex>
  );
}
