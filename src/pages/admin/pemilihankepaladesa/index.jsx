import { HeadAdmin } from "../../../component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TablePemilihanKepalaDesa } from "../../../component/table/TablePemilihanKepalaDesa";


export default function PemilihanKepalaDesa() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Pemilihan Kepala Desa
          </Heading>
          {TablePemilihanKepalaDesa()}
        </Container>
      </main>
    </>
  );
}

