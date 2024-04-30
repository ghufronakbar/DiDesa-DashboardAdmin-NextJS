import { HeadAdmin } from "../../../component/headAdmin";

import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { DetailPengurusDesa } from "../../../component/detail/DetailPengurusDesa";

export default function BeritaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{DetailPengurusDesa()}</Container>
      </main>
    </>
  );
}
