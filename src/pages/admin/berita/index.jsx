import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TableBerita } from "../../../component/table/TableBerita";
import { HeadAdmin } from "../../../component/headAdmin";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Berita() {
  const router = useRouter();
  
  return (
    <>     
      <TableBerita gap={8}/>
    </>
  );
}
