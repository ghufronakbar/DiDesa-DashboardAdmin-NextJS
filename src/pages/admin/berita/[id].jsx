import { HeadAdmin } from "../../../component/headAdmin";

import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { FormBeritaEdit } from "../../../component/form/FormBeritaEdit";

export default function BeritaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{FormBeritaEdit()}</Container>
      </main>
    </>
  );
}
