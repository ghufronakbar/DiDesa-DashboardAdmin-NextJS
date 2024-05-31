import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { HeadAdmin } from "../../../component/headAdmin";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableWarga } from "../../../component/table/TableWarga";
import { useRouter } from "next/router";

export default function Warga() {
  const router = useRouter();
  return (
    <>
     
          <TableWarga gap={8}/>
     
    </>
  );
}
