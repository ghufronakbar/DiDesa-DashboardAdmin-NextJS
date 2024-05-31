import React, { useState } from "react";
import {
  useDisclosure,
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Button,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Center,
  useToast,
  useQuery,
} from "@chakra-ui/react";
import { Navbar } from "../../../../component/NavbarAdmin";
import { TableJenisUMKM } from "../../../../component/table/TableJenisUMKM";
import { axiosInstance } from "../../../../lib/axios";
import { HeadAdmin } from "../../../../component/headAdmin";

export default function JenisUMKM() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [namaJenisUMKM, setNamaJenisUMKM] = useState("");
  const toast = useToast();

  

  return (
    <>
      <TableJenisUMKM gap={8} />
    </>
  );
}
