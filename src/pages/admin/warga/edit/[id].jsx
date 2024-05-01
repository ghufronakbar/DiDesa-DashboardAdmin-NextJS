import { HeadAdmin } from "../../../../component/headAdmin";
import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../../component/NavbarAdmin";
import { FormWargaEdit } from "../../../../component/form/FormWargaEdit";

export default function EditWargaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{FormWargaEdit()}</Container>
      </main>
    </>
  );
}
