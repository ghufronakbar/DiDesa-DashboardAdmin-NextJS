import { HeadAdmin} from "../../../../component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../../../component/NavbarAdmin";
import { TableJenisUMKM } from "../../../../component/table/TableJenisUMKM";



export default function JenisUMKM() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Jenis UMKM
          </Heading>
          {TableJenisUMKM()}
        </Container>
      </main>
    </>
  );
}

