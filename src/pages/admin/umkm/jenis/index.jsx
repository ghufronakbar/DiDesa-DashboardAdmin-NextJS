import { HeadAdmin} from "@/component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "@/component/NavbarAdmin";
import { TableUMKM } from "@/component/table/TableUMKM";


export default function UMKM() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            UMKM
          </Heading>
          {TableUMKM()}
        </Container>
      </main>
    </>
  );
}

