import { HeadAdmin } from "../../../../../component/headAdmin";
import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../../../component/NavbarAdmin";
import { FormCalonKetuaAdd } from "../../../../../component/form/FormCalonKetuaAdd";

export default function AddCalonKetua() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{FormCalonKetuaAdd()}</Container>
      </main>
    </>
  );
}
