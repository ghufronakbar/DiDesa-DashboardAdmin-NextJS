import { HeadAdmin} from "@/component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "@/component/NavbarAdmin";
import { TableWarga } from "@/component/table/TableWarga";


export default function Warga() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Warga
          </Heading>
          {TableWarga()}
        </Container>
      </main>
    </>
  );
}

