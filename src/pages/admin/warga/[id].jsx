import { HeadAdmin } from "../../../component/headAdmin";
import { Container } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { DetailWarga } from "../../../component/detail/DetailWarga";

export default function WargaID() {
  return (
    <>
      {HeadAdmin()}
      <main>
        {Navbar()}
        <Container maxW="80%">{DetailWarga()}</Container>
      </main>
    </>
  );
}
