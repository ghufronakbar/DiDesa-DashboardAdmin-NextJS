import { Flex, Spacer, Box, Heading, Link as ChakraLink, Button, UnorderedList, List, Image } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { NavbarBrand } from 'reactstrap';

export default function NavbarAdmin() {
  const router = useRouter();

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    router.push("/admin/login");
  };

  return (
    <Flex p={4} bg="blue.500" color="white">
      <Box>
        
        <NavbarBrand><Image src='/konek.png' width="100px" ></Image></NavbarBrand>
      </Box>
      <Spacer />
      <Box>
        <nav>
          <UnorderedList style={{ display: 'flex', listStyleType: 'none', gap: '20px', margin: 0, padding: 0 }}>
            <List>
              <ChakraLink href="/admin/berita">Berita</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/pemilihanketua">Pemilihan Ketua</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/informasidesa">Informasi Desa</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/jenisumkm" >Jenis UMKM</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/komentar">Komentar</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/pengaduanmasyarakat">Pengaduan Masyarakat</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/pengurusdesa">Pengurus Desa</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/umkm">UMKM</ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/warga">Warga</ChakraLink>
            </List>
            <List>
              <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
            </List>
          </UnorderedList>
        </nav>
      </Box>
    </Flex>
  );
}
