import { HeadAdmin } from "../../../component/headAdmin";
import {
  Container,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../../component/NavbarAdmin";
import { TablePengaduanMasyarakat } from "../../../component/table/TablePengaduanMasyarakat";


export default function PengaduanMasyarakat() {
  return (
    <>
       
          <TablePengaduanMasyarakat gap={8}/>
        
    </>
  );
}

