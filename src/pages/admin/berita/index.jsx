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

export default function Home() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      judul: "",
      subjudul: "",
      tanggal: "",
      isi: "",
      gambar: "",
      publikasi: "",
      prioritas: "",
      berita_id: "",
    },
    onSubmit: async () => {
      const {
        judul,
        subjudul,
        tanggal,
        isi,
        gambar,
        publikasi,
        prioritas,
        berita_id,
      } = formik.values;

      if (berita_id) {
        //MELAKUKAN PUT BERITA /api/berita/edit/{id}
        editBerita({
          judul,
          subjudul,
          tanggal,
          isi,
          gambar,
          publikasi,
          prioritas,
          berita_id,
        });

        toast({
          title: "Berita berhasil diedit",
          status: "success",
        });
        
      } else {
        //MELAKUKAN POST BERITA /api/berita/add
        mutate({
          judul,
          subjudul,
          tanggal,
          isi,
          gambar,
          publikasi,
          prioritas,
        });

        toast({
          title: "Berita berhasil ditambahkan",
          status: "success",
        });
        
      }
      formik.setFieldValue("judul", "");
      formik.setFieldValue("subjudul", "");
      formik.setFieldValue("tanggal", "");
      formik.setFieldValue("isi", "");
      formik.setFieldValue("gambar", "");
      formik.setFieldValue("publikasi", "");
      formik.setFieldValue("prioritas", "");
      formik.setFieldValue("berita_id", "");
      
    },onSuccess: () => {refetchData();}
  });

  const { mutate: editBerita } = useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.put(
        `/api/berita/edit/${body.berita_id}`,
        body
      );
      return productResponse;
    },
    onSuccess: () => {refetchData();},
  });

  const { mutate } = useMutation({
    mutationFn: async (body) => {
      const beritaResponse = await axiosInstance.post("/api/berita/add", body);
      return beritaResponse;
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };
  const { data, refetch:refetchData } = useQuery({
    queryFn: async () => {
      const beritaResponse = await axiosInstance.get("/api/berita");
      return beritaResponse;
    },
  });

  const { mutate: deleteBerita } = useMutation({
    mutationFn: async (berita_id) => {
      const beritaResponse = await axiosInstance.delete(
        `/api/berita/delete/${berita_id}`
      );
      return beritaResponse;
    },
    onSuccess:()=>{refetchData()}
  });

  const confirmationDelete = (beritaId) => {
    const shouldDelete = confirm("Yakin ingin menghapus berita ini?");
    if (shouldDelete) {
      deleteBerita(beritaId);
      toast({
        title: "Berhasil menghapus berita ini",
        status: "info",
      });
      
    }
  };

  const onEdit = (berita) => {
    formik.setFieldValue("berita_id", berita.berita_id);
    formik.setFieldValue("judul", berita.judul);
    formik.setFieldValue("subjudul", berita.subjudul);
    formik.setFieldValue("isi", berita.isi);
    formik.setFieldValue("tanggal", berita.tanggal);

    formik.setFieldValue("publikasi", berita.publikasi);
    formik.setFieldValue("prioritas", berita.prioritas);
  };

  const renderBerita = () => {
    return data?.data.values.map((berita) => {
      return (
        <Tr key={berita.berita_id}>
          <Td>{berita.berita_id}</Td>
          <Td>{berita.judul}</Td>
          <Td>{berita.subjudul}</Td>
          <Td>{berita.isi}</Td>
          <Td>{berita.gambar}</Td>
          <Td>{berita.tanggal}</Td>
          <Td>{berita.publikasi}</Td>
          <Td>{berita.prioritas}</Td>
          <Td colSpan={2}>
            <Button onClick={() => onEdit(berita)} colorScheme="cyan">
              Edit
            </Button>
          </Td>
          <Td>
            <Button
              onClick={() => confirmationDelete(berita.berita_id)}
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
          <Heading>Data Berita</Heading>
          
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="3">
              <FormControl>
                <FormLabel>Berita Id</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="berita_id"
                  value={formik.values.berita_id}
                  
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Judul</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="judul"
                  value={formik.values.judul}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Sub Judul</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="subjudul"
                  value={formik.values.subjudul}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Isi</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="isi"
                  value={formik.values.isi}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <Input
                  onChange={handleFormInput}
                  type="date"
                  name="tanggal"
                  value={formik.values.tanggal}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Gambar</FormLabel>
                <Input
                  onChange={handleFormInput}
                  type="file"
                  name="gambar"
                  value={formik.values.gambar}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Publikasi</FormLabel>
                <select
                  name="publikasi"
                  onChange={handleFormInput}
                  value={formik.values.publikasi}
                >
                  <option value="0">Tidak Dipublikasi</option>
                  <option value="1">Dipublikasi</option>
                </select>
              </FormControl>
              <FormControl>
                <FormLabel>Prioritas</FormLabel>
                <select
                  name="prioritas"
                  onChange={handleFormInput}
                  value={formik.values.prioritas}
                >
                  <option value="0">Tidak Prioritas</option>
                  <option value="1">Prioritas</option>
                </select>
              </FormControl>
              
              <Button type="submit">Submit</Button>
            </VStack>
          </form>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Judul</Th>
                <Th>Sub Judul</Th>
                <Th>Isi</Th>
                <Th>Gambar</Th>
                <Th>Tanggal</Th>
                <Th>Publikasi</Th>
                <Th>Prioritas</Th>
                <Th colSpan={2}>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>{renderBerita()}</Tbody>
          </Table>
        </Container>
      </main>
    </>
  );
}
