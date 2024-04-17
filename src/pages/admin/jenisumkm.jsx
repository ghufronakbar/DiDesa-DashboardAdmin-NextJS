import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    useToast,
  } from "@chakra-ui/react";
  import { axiosInstance } from "@/lib/axios";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import { headAdmin } from "@/component/headAdmin";
  import { useFormik } from "formik";
  
  export default function JenisUMKM() {
    const toast = useToast();
  
    const formik = useFormik({
      initialValues: {
        jenis_umkm_id: "",
        nama_jenis_umkm: "",
      },
      onSubmit: async () => {
        const { jenis_umkm_id, nama_jenis_umkm } = formik.values;
  
        if (jenis_umkm_id) {
          // Melakukan PUT pada "/api/jenisumkm/edit/:id"
          editJenisUMKM({ jenis_umkm_id, nama_jenis_umkm });
  
          toast({
            title: "Jenis UMKM berhasil diupdate",
            status: "success",
          });
        } else {
          // Melakukan POST pada "/api/jenisumkm/add"
          mutate({ nama_jenis_umkm });
  
          toast({
            title: "Jenis UMKM berhasil ditambahkan",
            status: "success",            
          });
        }
        formik.setFieldValue("jenis_umkm_id", "");
        formik.setFieldValue("nama_jenis_umkm", "");        
      },
      onSuccess: () => {
        refetchData();
      },
    });
  
    const { mutate: editJenisUMKM } = useMutation({
      mutationFn: async (body) => {
        const response = await axiosInstance.put(
          `/api/jenisumkm/edit/${body.jenis_umkm_id}`,
          body
        );
        return response;
      },
      onSuccess: () => {
        refetchData();
      },
    });
  
    const { mutate } = useMutation({
      mutationFn: async (body) => {
        const response = await axiosInstance.post("/api/jenisumkm/add", body);
        return response;
      },
    });
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };
  
    const { data, refetch: refetchData } = useQuery({
      queryFn: async () => {
        const response = await axiosInstance.get("/api/jenisumkm");
        return response;
      },
    });
  
    const { mutate: deleteJenisUMKM } = useMutation({
      mutationFn: async (jenis_umkm_id) => {
        const response = await axiosInstance.delete(
          `/api/jenisumkm/delete/${jenis_umkm_id}`
        );
        return response;
      },
      onSuccess: () => {
        refetchData();
      },
    });
  
    const confirmationDelete = (jenis_umkm_id) => {
      const shouldDelete = confirm("Yakin ingin menghapus jenis UMKM ini?");
      if (shouldDelete) {
        deleteJenisUMKM(jenis_umkm_id);
        toast({
          title: "Berhasil menghapus jenis UMKM ini",
          status: "info",
        });
      }
    };
  
    const onEdit = (jenisUMKM) => {
      formik.setFieldValue("jenis_umkm_id", jenisUMKM.jenis_umkm_id);
      formik.setFieldValue("nama_jenis_umkm", jenisUMKM.nama_jenis_umkm);
    };
  
    const renderJenisUMKM = () => {
      return data?.data.values.map((jenisUMKM) => {
        return (
          <Tr key={jenisUMKM.jenis_umkm_id}>
            <Td>{jenisUMKM.jenis_umkm_id}</Td>
            <Td>{jenisUMKM.nama_jenis_umkm}</Td>
            <Td colSpan={2}>
              <Button onClick={() => onEdit(jenisUMKM)} colorScheme="cyan">
                Edit
              </Button>
            </Td>
            <Td>
              <Button
                onClick={() => confirmationDelete(jenisUMKM.jenis_umkm_id)}
                colorScheme="red"
              >
                Delete
              </Button>
            </Td>
          </Tr>
        );
      });
    };
  
    return (
      <>
        {headAdmin()}
        <main>
          <Container>
            <Heading>Data Jenis UMKM</Heading>            
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing="3">
                <FormControl>
                  <FormLabel>Jenis UMKM ID</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="jenis_umkm_id"
                    value={formik.values.jenis_umkm_id}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Nama Jenis UMKM</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="nama_jenis_umkm"
                    value={formik.values.nama_jenis_umkm}
                  ></Input>
                </FormControl>
  
                <Button type="submit">Submit</Button>
              </VStack>
            </form>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nama Jenis UMKM</Th>
                  <Th colSpan={2}>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>{renderJenisUMKM()}</Tbody>
            </Table>
          </Container>
        </main>
      </>
    );
  }
  