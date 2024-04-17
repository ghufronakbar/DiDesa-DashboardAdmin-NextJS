import { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  
} from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';
import { headAdmin } from '@/component/headAdmin';
import NavbarAdmin from "@/component/navbarAdmin";

export default function PengaduanMasyarakat() {
  const [pengaduanData, setPengaduanData] = useState([]);
  

  useEffect(() => {
    const fetchPengaduanData = async () => {
      try {
        const response = await axiosInstance.get('/api/pengaduanmasyarakatwarga');
        console.log('Data Pengaduan Masyarakat:', response.data);
        // Sort the data by the 'tanggal' field in descending order (latest first)
        const sortedData = response.data.values.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        setPengaduanData(sortedData);
      } catch (error) {
        console.error('Error fetching Pengaduan Masyarakat data:', error);
      }
    };

    fetchPengaduanData();
  }, []);

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br /><br />
      <Container maxW='1500px'>
        <Heading as="h1" my={6}>Daftar Pengaduan Masyarakat</Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nama</Th>
              <Th>Subjek</Th>
              <Th>Isi</Th>
              <Th>Tanggal</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pengaduanData.map((pengaduan, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{pengaduan.nama_lengkap}</Td>
                <Td>{pengaduan.subjek}</Td>
                <Td>{pengaduan.isi}</Td>
                <Td>{new Date(pengaduan.tanggal).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
