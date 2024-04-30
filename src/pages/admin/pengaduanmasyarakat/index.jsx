import { HeadAdmin } from "../../../component/headAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TablePengaduanMasyarakat } from "../../../component/table/TablePengaduanMasyarakat";


export default function PengaduanMasyarakat() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Pengaduan Masyarakat
          </Heading>
          {TablePengaduanMasyarakat()}
        </Container>
      </main>
    </>
  );
}

