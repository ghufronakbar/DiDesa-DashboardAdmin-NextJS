import { HeadAdmin } from "../../../component/headAdmin";

import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { FormBerita } from "../../../component/form/FormBerita";

export default function BeritaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{FormBerita()}</Container>
      </main>
    </>
  );
}
