import {
  Flex,
  Spacer,
  Box,
  Heading,
  Link as ChakraLink,
  Button,
  UnorderedList,
  List,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Nav, NavbarBrand } from "reactstrap";

export function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <Flex p={1} bg="#4FD1C5" color="white" padding='3'>
      <Box>
        <NavbarBrand>
          
        <Button colorScheme="white" variant="ghost">
                  LESTARI ADMIN
                </Button>
        </NavbarBrand>
      </Box>
      <Spacer />
      <Box>
        <Nav vertical>
          <UnorderedList
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <List>
              <ChakraLink href="/admin/berita">
                <Button colorScheme="white" variant="ghost">
                  Berita
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/informasidesa">
                <Button colorScheme="white" variant="ghost">
                  Informasi Desa
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/komentar">
                <Button colorScheme="white" variant="ghost">
                  Komentar
                </Button>
              </ChakraLink>
            </List>
            <List>
              <ChakraLink href="/admin/pengaduanmasyarakat">
                <Button colorScheme="white" variant="ghost">
                Pengaduan Masyarakat
                </Button>
              </ChakraLink>
            </List>   
            <List>
              <ChakraLink href="/admin/pemilihanketua">
                <Button colorScheme="white" variant="ghost">
                Pemilihan Ketua
                </Button>
              </ChakraLink>
            </List>   
            <List>
              <ChakraLink href="/admin/pengurusdesa">
                <Button colorScheme="white" variant="ghost">
                Pengurus Desa
                </Button>
              </ChakraLink>
            </List>       
            <List>
              <ChakraLink href="/admin/umkm">
                <Button colorScheme="white" variant="ghost">
                UMKM
                </Button>
              </ChakraLink>
            </List>          
            <List>
              <ChakraLink href="/admin/umkm/jenis">
                <Button colorScheme="white" variant="ghost">
                Jenis UMKM
                </Button>
              </ChakraLink>
            </List>     
            <List>
              <ChakraLink href="/admin/warga">
                <Button colorScheme="white" variant="ghost">
                Warga
                </Button>
              </ChakraLink>
            </List>     
          </UnorderedList>
        </Nav>
      </Box>
    </Flex>
  );
}
