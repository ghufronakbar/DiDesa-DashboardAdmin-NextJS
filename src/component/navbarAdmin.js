import Link from 'next/link';
import { Flex, Spacer, Box, Heading, Link as ChakraLink } from '@chakra-ui/react';

export default function NavbarAdmin() {
  return (    
    <Flex p={4} bg="blue.500" color="white">
      <Box>
        <Heading size="md">Konek</Heading>
      </Box>
      <Spacer />
      <Box>
        <nav>
          <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px', margin: 0, padding: 0 }}>
            <li>
              <Link href="/admin/berita" passHref>
                <ChakraLink>Berita</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/pemilihanketua" passHref>
                <ChakraLink>Pemilihan Ketua</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/informasidesa" passHref>
                <ChakraLink>Informasi Desa</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/jenisumkm" passHref>
                <ChakraLink>Jenis UMKM</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/komentar" passHref>
                <ChakraLink>Komentar</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/pengaduanmasyarakat" passHref>
                <ChakraLink>Pengaduan Masyarakat</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/pengurusdesa" passHref>
                <ChakraLink>Pengurus Desa</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/umkm" passHref>
                <ChakraLink>UMKM</ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/admin/warga" passHref>
                <ChakraLink>Warga</ChakraLink>
              </Link>
            </li>
          </ul>
        </nav>
      </Box>      
    </Flex>
  );
}
