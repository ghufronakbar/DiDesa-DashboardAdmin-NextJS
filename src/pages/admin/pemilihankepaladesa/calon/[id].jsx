import { HeadAdmin } from "../../../../component/headAdmin";
import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../../component/NavbarAdmin";
import { FormCalonKetuaEdit } from "../../../../component/form/FormCalonKetuaEdit";

export default function EditCalonKetuaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{FormCalonKetuaEdit()}</Container>
      </main>
    </>
  );
}
