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
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  useToast,
} from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';
import { headAdmin } from '@/component/headAdmin';
import NavbarAdmin from '@/component/navbarAdmin';

export default function UMKM() {
  const toast = useToast()
  const [umkmData, setUmkmData] = useState([]);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [approveValue, setApproveValue] = useState('');
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  useEffect(() => {
    const fetchUmkmData = async () => {
      try {
        const response = await axiosInstance.get('/api/detailumkm');
        console.log('Data UMKM:', response.data);
        setUmkmData(response.data.values);
      } catch (error) {
        console.error('Error fetching UMKM data:', error);
      }
    };

    fetchUmkmData();
  }, []);

  const handleEdit = (umkm) => {
    setSelectedUmkm(umkm);
    setApproveValue(umkm.approve ? '1' : '0'); // Set radio button value based on approve status
    onEditOpen();
  };

  const handleApproveChange = (value) => {
    setApproveValue(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`/api/umkm/approve/${selectedUmkm.umkm_id}`, {
        approve: approveValue,
      });
      console.log('Response from server:', response.data);
      // Reset form after successful submission
      setApproveValue('');
      onEditClose();
      toast({
        title: "Update Data Berhasil",
        status: "success",
      });
      // Refresh data or perform any other necessary actions
      location.reload()
    } catch (error) {
      console.error('Error editing UMKM:', error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleDelete = async (umkmId) => {
    try {
      const response = await axiosInstance.delete(`/api/umkm/delete/${umkmId}`);
      console.log('Response from server:', response.data);
      // Refresh data or perform any other necessary actions
      const updatedUmkmData = umkmData.filter((umkm) => umkm.umkm_id !== umkmId);
      setUmkmData(updatedUmkmData);
      toast({
        title: "Delete Data Berhasil",
        status: "warning",
      });
      onDeleteClose(); // Close the AlertDialog after successful deletion
    } catch (error) {
      console.error('Error deleting UMKM:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br /><br />
      <Container maxW='1500px'>
        <Heading as="h1" my={6}>Daftar UMKM</Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nama</Th>
              <Th>Jenis UMKM</Th>
              <Th>Deskripsi</Th>
              <Th>Gambar</Th>
              <Th>Lokasi</Th>
              <Th>Approve</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {umkmData.map((umkm) => (
              <Tr key={umkm.umkm_id}>
                <Td>{umkm.umkm_id}</Td>
                <Td>{umkm.nama}</Td>
                <Td>{umkm.nama_jenis_umkm}</Td>
                <Td>{umkm.deskripsi}</Td>
                <Td>
                  <img src={umkm.gambar} alt={umkm.nama} style={{ width: '50px' }} />
                </Td>
                <Td>{umkm.lokasi}</Td>
                <Td>{umkm.approve ? 'Approved' : 'Belum Approved'}</Td>
                <Td>{umkm.status ? 'Aktif' : 'Tidak Aktif'}</Td>
                <Td>
                  <Tooltip label="Edit" placement="top">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEdit(umkm)}
                      mr={2}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip label="Delete" placement="top">
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setSelectedUmkm(umkm);
                        onDeleteOpen();
                      }}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>

      {/* Modal for Edit */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Approve Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="fieldset">
              <FormLabel as="legend">Approve Status:</FormLabel>
              <RadioGroup onChange={handleApproveChange} value={approveValue}>
                <Stack spacing={4}>
                  <Radio value="1">Approve</Radio>
                  <Radio value="0">Belum Approve</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Dialog for Delete */}
      <AlertDialog isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus UMKM
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Apakah Anda yakin ingin menghapus UMKM ini?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={() => handleDelete(selectedUmkm?.umkm_id || '')} ml={3}>
                Hapus
              </Button>
              <Button variant="ghost" onClick={onDeleteClose} ml={3}>
                Batal
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
