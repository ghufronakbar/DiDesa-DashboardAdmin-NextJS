import { useState, useEffect, useRef } from 'react';
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
  Select,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  useToast,
} from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';
import { headAdmin } from '@/component/headAdmin';
import NavbarAdmin from '@/component/navbarAdmin';

export default function PengurusDesa() {
  const [pengurusData, setPengurusData] = useState([]);
  const [wargaOptions, setWargaOptions] = useState([]);
  const [selectedPengurus, setSelectedPengurus] = useState(null);
  const [selectedWargaId, setSelectedWargaId] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [aksesAdmin, setAksesAdmin] = useState('');
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = useRef();
  const toast = useToast()

  useEffect(() => {
    const fetchPengurusData = async () => {
      try {
        const response = await axiosInstance.get('/api/detailpengurus');
        console.log('Data Pengurus Desa:', response.data);
        setPengurusData(response.data.values);
      } catch (error) {
        console.error('Error fetching Pengurus Desa data:', error);
      }
    };

    fetchPengurusData();
  }, []);

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

  const handleAdd = () => {
    setSelectedPengurus(null);
    setSelectedWargaId('');
    setJabatan('');
    setAksesAdmin('');
    onOpenEdit();
  };

  const handleEdit = (pengurus) => {
    setSelectedPengurus(pengurus);
    setSelectedWargaId(pengurus.warga_id);
    setJabatan(pengurus.jabatan);
    setAksesAdmin(String(pengurus.akses_admin));
    onOpenEdit();
  };

  const handleDelete = (pengurus) => {
    setSelectedPengurus(pengurus);
    setIsOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log('Deleting Pengurus Desa:', selectedPengurus);

      const response = await axiosInstance.delete(`/api/pengurusdesaanggota/delete/${selectedPengurus.pengurus_desa_anggota_id}`);
      console.log('Response from server:', response.data);
      onCloseDelete();
      toast({
        title: "Delete Data berhasil",
        status: "warning",
      });
      location.reload()
      // Refresh data or perform any other necessary actions
    } catch (error) {
      console.error('Error deleting Pengurus Desa:', error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      const formData = {
        warga_id: selectedWargaId,
        jabatan: jabatan,
        akses_admin: parseInt(aksesAdmin),
      };

      console.log('Adding Pengurus Desa:', formData);
      const response = await axiosInstance.post('/api/pengurusdesaanggota/add', formData);
      console.log('Response from server:', response.data);
      onCloseEdit();
      toast({
        title: "Insert Data Berhasil",
        status: "success",
      });
      location.reload()
      // Refresh data or perform any other necessary actions
    } catch (error) {
      console.error('Error adding Pengurus Desa:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = {
        warga_id: selectedWargaId,
        jabatan: jabatan,
        akses_admin: parseInt(aksesAdmin),
      };

      console.log('Editing Pengurus Desa:', selectedPengurus);
      const response = await axiosInstance.put(`/api/pengurusdesaanggota/edit/${selectedPengurus.pengurus_desa_anggota_id}`, formData);
      console.log('Response from server:', response.data);
      onCloseEdit();
      toast({
        title: "Update Data Berhasil",
        status: "success",
      });
      location.reload()
      // Refresh data or perform any other necessary actions
    } catch (error) {
      console.error('Error editing Pengurus Desa:', error);
    }
  };

  return (
    <>
      {headAdmin()}
      {NavbarAdmin()}
      <br /><br />
      <Container maxW='1500px'>
        <Heading as="h1" my={6}>Pengurus Desa</Heading>
        <Button colorScheme="blue" onClick={handleAdd} mb={4}>Add Pengurus</Button>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Lengkap</Th>
              <Th>Jabatan</Th>
              <Th>Akses Admin</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pengurusData.map((pengurus, index) => (
              <Tr key={pengurus.pengurus_desa_anggota_id}>
                <Td>{index + 1}</Td>
                <Td>{pengurus.nama_lengkap}</Td>
                <Td>{pengurus.jabatan}</Td>
                <Td>{pengurus.akses_admin === 1 ? 'Yes' : 'No'}</Td>
                <Td>
                  <Tooltip label="Edit" placement="top">
                    <Button size="sm" colorScheme="blue" onClick={() => handleEdit(pengurus)} mr={2}>
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip label="Delete" placement="top">
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(pengurus)}>
                      Delete
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Modal for Add and Edit */}
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedPengurus ? 'Edit Pengurus Desa' : 'Add Pengurus Desa'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nama Lengkap</FormLabel>
                <Select
                  placeholder="Pilih Nama Lengkap"
                  value={selectedWargaId}
                  onChange={(e) => setSelectedWargaId(e.target.value)}
                  disabled={selectedPengurus?true:false}
                >
                  {wargaOptions.map((warga) => (
                    <option key={warga.warga_id} value={warga.warga_id}>{warga.nama_lengkap}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Jabatan</FormLabel>
                <Select
                  placeholder="Pilih Jabatan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                >
                  <option value="Kepala Desa">Kepala Desa</option>
                  <option value="Sekretaris">Sekretaris</option>
                  <option value="Bendahara">Bendahara</option>
                  <option value="Pegawai">Pegawai</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Akses Admin</FormLabel>
                <RadioGroup value={aksesAdmin} onChange={(value) => setAksesAdmin(value)}>
                  <Stack spacing={4} direction="row">
                    <Radio value="1">Yes</Radio>
                    <Radio value="0">No</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              {selectedPengurus ? (
                <Button colorScheme="blue" onClick={handleEditSubmit}>Submit</Button>
              ) : (
                <Button colorScheme="blue" onClick={handleAddSubmit}>Submit</Button>
              )}
              <Button variant="ghost" onClick={onCloseEdit}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Confirmation Dialog for Delete */}
        <AlertDialog isOpen={isOpenDelete} leastDestructiveRef={cancelRef} onClose={onCloseDelete}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">Delete Pengurus</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseDelete}>Cancel</Button>
                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </>
  );
}
