import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { primaryColor, white } from "../../lib/color";
import {axiosInstance} from "../../lib/axios";

function Copyright(props) {
  return (
    <Text align="center" {...props}>
      {"Copyright © "}
      <Link color="blue.500" href={process.env.NEXT_PUBLIC_URL}>
        DiDesa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}

export default function SignInSide() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        nik,
        password,
      });

      const { success, message, token, status } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        toast({
          title: response.data.message,
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });

        router.push(`/admin/informasidesa`);
      } else {
        console.log(response);
        setError(message);
        toast({
          title: error.response.data.message,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      const errorMessage =
        error.response?.data?.message || "Failed to login. Please try again.";
      setError(errorMessage);
      toast({
        title: errorMessage,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} flex="1">
        <Box
          display={{ base: "none", md: "block" }}
          bgImage="url(https://source.unsplash.com/random?wallpapers)"
          bgSize="cover"
          bgPosition="center"
        />
        <Container maxW="md" py={8} mt={32}>
          <Flex align="center" justify="center" direction="column">
            <Avatar bg={primaryColor} icon={<LockIcon />} mb={4} />
            <Heading as="h1" size="lg" mb={6}>
              Login sebagai Pengurus Desa
            </Heading>
            <Box as="form" w="100%" onSubmit={handleLogin}>
              <VStack spacing={4}>
                <FormControl id="nik" isRequired>
                  <FormLabel>NIK</FormLabel>
                  <Input
                    type="nik"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Checkbox>Remember me</Checkbox>
                </FormControl>
                <Button type="submit" color={white} bg={primaryColor} w="full">
                  Login
                </Button>
              </VStack>
              <Flex justify="space-between" mt={4}>
                <HStack
                  onClick={() => {
                    router.push(`/admin/register`);
                  }}
                >
                  <Text>Don't have an account?</Text>
                  <Text color={primaryColor}>Register</Text>
                </HStack>
              </Flex>
              <Copyright mt={8} />
            </Box>
          </Flex>
        </Container>
      </Grid>
    </Box>
  );
}
