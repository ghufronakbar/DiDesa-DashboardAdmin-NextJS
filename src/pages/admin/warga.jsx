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
import NavbarAdmin from "@/component/navbarAdmin";
  
  export default function Warga() {
    const toast = useToast();
  
    const formik = useFormik({
      initialValues: {
        warga_id: "",
        nik: "",
        kk: "",
        nama_lengkap: "",
        tanggal_lahir: "",
      },
      onSubmit: async () => {
        const { warga_id, nik, kk, nama_lengkap, tanggal_lahir } = formik.values;
  
        if (warga_id) {
          // Melakukan PUT pada "/api/warga/edit/:id"
          editWarga({ warga_id, nik, kk, nama_lengkap, tanggal_lahir });
  
          toast({
            title: "Update Data Berhasil",
            status: "success",
          });
        } else {
          // Melakukan POST pada "/api/warga/add"
          mutate({ nik, kk, nama_lengkap, tanggal_lahir });
  
          toast({
            title: "Update Data Berhasil",
            status: "success",
          });
        }
        formik.setFieldValue("warga_id", "");
        formik.setFieldValue("nik", "");
        formik.setFieldValue("kk", "");
        formik.setFieldValue("nama_lengkap", "");
        formik.setFieldValue("tanggal_lahir", "");
      },
      onSuccess: () => {
        refetchData();
      },
    });
  
    const { mutate: editWarga } = useMutation({
      mutationFn: async (body) => {
        const response = await axiosInstance.put(
          `/api/warga/edit/${body.warga_id}`,
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
        const response = await axiosInstance.post("/api/warga/add", body);
        return response;
      },
    });
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };
  
    const { data, refetch: refetchData } = useQuery({
      queryFn: async () => {
        const response = await axiosInstance.get("/api/warga");
        return response;
      },
    });
  
    const { mutate: deleteWarga } = useMutation({
      mutationFn: async (warga_id) => {
        const response = await axiosInstance.delete(
          `/api/warga/delete/${warga_id}`
        );
        return response;
      },
      onSuccess: () => {
        refetchData();
      },
    });
  
    const confirmationDelete = (warga_id) => {
      const shouldDelete = confirm("Yakin ingin menghapus data warga ini?");
      if (shouldDelete) {
        deleteWarga(warga_id);
        toast({
          title: "Delete Data Berhasil",
          status: "warning",
        });
      }
    };
  
    const onEdit = (warga) => {
      formik.setFieldValue("warga_id", warga.warga_id);
      formik.setFieldValue("nik", warga.nik);
      formik.setFieldValue("kk", warga.kk);
      formik.setFieldValue("nama_lengkap", warga.nama_lengkap);
      formik.setFieldValue("tanggal_lahir", warga.tanggal_lahir);
    };
  
    const renderWarga = () => {
      return data?.data.values.map((warga) => {
        return (
          <Tr key={warga.warga_id}>
            <Td>{warga.warga_id}</Td>
            <Td>{warga.nik}</Td>
            <Td>{warga.kk}</Td>
            <Td>{warga.nama_lengkap}</Td>
            <Td>{warga.tanggal_lahir}</Td>
            <Td colSpan={2}>
              <Button onClick={() => onEdit(warga)} colorScheme="cyan">
                Edit
              </Button>
            </Td>
            <Td>
              <Button
                onClick={() => confirmationDelete(warga.warga_id)}
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
        {NavbarAdmin()}
      <br /><br />
        <main>
          <Container maxW='1500px'r>
            <Heading>Data Warga</Heading>
  
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing="3">
                <FormControl>
                  <FormLabel>Warga ID</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="warga_id"
                    value={formik.values.warga_id}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>NIK</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="nik"
                    value={formik.values.nik}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>KK</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="kk"
                    value={formik.values.kk}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    name="nama_lengkap"
                    value={formik.values.nama_lengkap}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    type="date"
                    name="tanggal_lahir"
                    value={formik.values.tanggal_lahir}
                  ></Input>
                </FormControl>
  
                <Button type="submit">Submit</Button>
              </VStack>
            </form>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NIK</Th>
                  <Th>KK</Th>
                  <Th>Nama Lengkap</Th>
                  <Th>Tanggal Lahir</Th>
                  <Th colSpan={2}>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>{renderWarga()}</Tbody>
            </Table>
          </Container>
        </main>
      </>
    );
  }
  