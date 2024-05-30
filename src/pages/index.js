import Head from "next/head";
import { Container, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";
import {axiosInstance} from "../lib/axios"
import Berita from "./admin/berita";

//Chakra UI
//Formik
//Yup
//Axios
//react-query


export default function Home() {
  const [berita, setBerita] = useState([]); //menyimpan data response GET/berita

  const fetchBerita = async () => {  
    try{
      const beritaResponse = await axiosInstance.get("/api/berita")      
      setBerita(beritaResponse.data.values)      
    }catch(error){
      console.log(error)
    }       
  }

  const renderBerita =()=>{
    return berita.map((berita)=>{
      return (
        <Tr key={berita.berita_id}>
          <Td>{berita.berita_id}</Td>
          <Td>{berita.judul}</Td>
          <Td>{berita.tanggal}</Td>
          <Td>{berita.publikasi}</Td>
          <Td>{berita.prioritas}</Td>
          <Td></Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchBerita()
  }, [])


  return (
    <>
      <Berita/>
    </>
  );
}
