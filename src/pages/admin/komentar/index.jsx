import { HeadAdmin } from "../../../component/headAdmin";
import { Container, Heading } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableKomentar } from "../../../component/table/TableKomentar";

export default function Komentar() {
  return (
    <>
      <TableKomentar gap={8} />
    </>
  );
}
