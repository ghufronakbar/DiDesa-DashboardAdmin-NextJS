import { HeadAdmin} from "@/component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "@/component/NavbarAdmin";
import { TableBerita } from "@/component/table/TableBerita";


export default function Berita() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Berita
          </Heading>
          {TableBerita()}
        </Container>
      </main>
    </>
  );
}

