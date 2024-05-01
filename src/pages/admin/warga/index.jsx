
import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { HeadAdmin } from "../../../component/headAdmin";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableWarga } from "../../../component/table/TableWarga";
import { useRouter } from "next/router";



export default function Warga() {
  const router = useRouter();
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
        <Flex marginBottom="8" marginTop="8">
            <Heading flex={1}>Warga</Heading>
            <Spacer flex={8} />

            <Box
              as="button"
              borderRadius="md"
              bg="#48BB78"
              color="white"
              px={4}
              h={10}
              onClick={()=>{router.push('/admin/warga/add')}}
            >
              Add Warga
            </Box>
          </Flex>
          {TableWarga()}
        </Container>
      </main>
    </>
  );
}

