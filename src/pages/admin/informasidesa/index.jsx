import { HeadAdmin } from "../../../component/headAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { FormInformasiDesa } from "../../../component/form/FormInformasiDesa";


export default function InformasiDesa() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Informasi Desa
          </Heading>
          {FormInformasiDesa()}
        </Container>
      </main>
    </>
  );
}

