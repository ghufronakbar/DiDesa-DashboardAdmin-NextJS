import { Container, Heading } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableUMKM } from "../../../component/table/TableUMKM";
import { HeadAdmin } from "../../../component/headAdmin";

export default function UMKM() {
  return (
    <>
      <TableUMKM gap={8} />
    </>
  );
}
