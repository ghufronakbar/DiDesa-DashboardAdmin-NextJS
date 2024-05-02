import { HeadAdmin } from "../../../component/HeadAdmin";

import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { DetailPemilihanKepalaDesaID } from "../../../component/detail/DetailPemilihanKepalaDesa";

export default function PemilihanKepalaDesaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{DetailPemilihanKepalaDesaID()}</Container>
      </main>
    </>
  );
}
