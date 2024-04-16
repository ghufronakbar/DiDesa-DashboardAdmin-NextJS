import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,  
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
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
    },
    onSubmit: async () => {
      const { judul, subjudul, tanggal, isi, gambar, publikasi, prioritas } =
        formik.values;
      mutate({
        judul,
        subjudul,
        tanggal,
        isi,
        gambar,
        publikasi,
        prioritas,
      });

      formik.setFieldValue("judul", "");
      formik.setFieldValue("subjudul", "");
      formik.setFieldValue("tanggal", "");
      formik.setFieldValue("isi", "");
      formik.setFieldValue("gambar", "");
      formik.setFieldValue("publikasi", "");
      formik.setFieldValue("prioritas", "");
      toast({
        title: "Berita ditambahkan",
        status: "success",
      });
    },
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

  return (
    <>
      {headAdmin()}
      <main>
        <Container>
          <Heading>Tambah Berita</Heading>          
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="3">
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
        </Container>
      </main>
    </>
  );
}
