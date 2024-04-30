import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableBerita } from "../../../component/table/TableBerita";
import { HeadAdmin } from "../../../component/headAdmin";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Berita() {
  const router = useRouter();
  return (
    <>
      {HeadAdmin}
      <main>
        {Navbar()}
        <Container maxW="80%">
          <Flex marginBottom="8" marginTop="8">
            <Heading flex={1}>Berita</Heading>
            <Spacer flex={8} />

            <Box
              as="button"
              borderRadius="md"
              bg="#48BB78"
              color="white"
              px={4}
              h={10}
              onClick={()=>{router.push('/admin/berita/add')}}
            >
              Add Berita
            </Box>
          </Flex>

          {TableBerita()}
        </Container>
      </main>
    </>
  );
}
