import { HeadAdmin} from "@/component/HeadAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "@/component/NavbarAdmin";import { TablePengurusDesa } from "../../../component/table/TablePengurusDesa";


export default function PengurusDesa() {
  return (
    <>
      {HeadAdmin()}
      <main>
      {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Pengurus Desa
          </Heading>
          {TablePengurusDesa()}
        </Container>
      </main>
    </>
  );
}

