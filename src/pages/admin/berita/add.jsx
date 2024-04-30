import { Container, Heading } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { HeadAdmin } from "../../../component/headAdmin";
import { useRouter } from "next/router";
import { FormBeritaAdd } from "../../../component/form/FormBeritaAdd";

export default function AddBerita() {
  const router = useRouter();
  return (
    <>
      {HeadAdmin}
      <main>
        {Navbar()}
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Add Berita
          </Heading>

          {FormBeritaAdd()}
        </Container>
      </main>
    </>
  );
}
