import { Container, Heading } from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { HeadAdmin } from "../../../component/headAdmin";
import { useRouter } from "next/router";
import { FormWargaAdd } from "../../../component/form/FormWargaAdd";

export default function AddWarga() {
  const router = useRouter();
  return (
    <>
      <FormWargaAdd  gap={8}/>
    </>
  );
}
