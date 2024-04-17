import { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';
import { headAdmin } from '@/component/headAdmin';
import { useRouter } from 'next/router';
import NavbarAdmin from '@/component/navbarAdmin';

export default function DetailPemilihanKetuaDesa() {
  const toast = useToast()
  const router = useRouter();
  const { id } = router.query;

  const [pemilihanDetail, setPemilihanDetail] = useState(null);
  const [wargaOptions, setWargaOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    warga_id: '',
    deskripsi: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/pemilihanketuadesa/periode/${id}`);
        console.log('Data Detail Pemilihan Ketua Desa:', response.data);
        setPemilihanDetail(response.data.values.values[0]);
      } catch (error) {
        console.error('Error fetching pemilihan detail:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchWargaOptions = async () => {
      try {
        const response = await axiosInstance.get('/api/warga');
        setWargaOptions(response.data.values);
      } catch (error) {
        console.error('Error fetching warga options:', error);
      }
    };

    fetchWargaOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting Form with values:', formValues);
  
      let pemilihanKetuaId = '';
      if (pemilihanDetail) {
        pemilihanKetuaId = pemilihanDetail.pemilihan_ketua_id;
      } else if (id) {
        pemilihanKetuaId = id;
      } else {
        console.error('Error: pemilihan_ketua_id tidak ditemukan');
        return;
      }
  
      const formData = {
        ...formValues,
        pemilihan_ketua_id: pemilihanKetuaId
      };
  
      const response = await axiosInstance.post('/api/calonketua/add', formData);
      
      console.log('Response from server:', response.data);
      toast({
        title: "Insert Data Berhasil",
        status: "success",
      });
      // Reset form after successful submission
      setFormValues({
        warga_id: '',
        deskripsi: '',
      });
  
      // Redirect to index page
      router.push('/admin/pemilihanketua');
    } catch (error) {
      console.error('Error adding calon ketua:', error);
      // Optionally, you can show an error message to the user
    }
  };
  
  

  return (
    <>
      {headAdmin()}
      <main>
      {NavbarAdmin()}
      <br /><br />
        <Container maxW='1500px'>
          <Heading>Detail Pemilihan Ketua Desa</Heading>

          <form onSubmit={handleSubmit}>
            {pemilihanDetail && (
              <FormControl mt={4}>
                <FormLabel>Pemilihan Ketua ID</FormLabel>
                <input
                  type="text"
                  name="pemilihan_ketua_id"
                  value={pemilihanDetail.pemilihan_ketua_id || ''}
                  readOnly
                />
              </FormControl>
            )}

            <FormControl mt={4}>
              <FormLabel>Warga</FormLabel>
              <Select
                name="warga_id"
                value={formValues.warga_id}
                onChange={handleInputChange}
                placeholder="Pilih Warga"
              >
                {wargaOptions.map((warga) => (
                  <option key={warga.warga_id} value={warga.warga_id}>
                    {warga.nama_lengkap}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                name="deskripsi"
                value={formValues.deskripsi}
                onChange={handleInputChange}
                placeholder="Deskripsi Calon Ketua"
              />
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit">
              Submit
            </Button>
          </form>

          {pemilihanDetail && pemilihanDetail.calon_ketua.length > 0 && (
            <Table mt={8}>
              <Thead>
                <Tr>
                  <Th>ID Calon Ketua</Th>
                  <Th>Nama Calon Ketua</Th>
                  <Th>Deskripsi</Th>
                  <Th>Total Pemilih</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pemilihanDetail.calon_ketua.map((calon, index) => (
                  <Tr key={index}>
                    <Td>{calon.calon_ketua_id}</Td>
                    <Td>{calon.namalengkap}</Td>
                    <Td>{calon.deskripsi_calon}</Td>
                    <Td>{calon.total_pemilih}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Container>
      </main>
    </>
  );
}
