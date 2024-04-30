import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";
import { Main } from "next/document";
import { Button, Container, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { headAdmin } from "@/component/headAdmin";

function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/api/admin/login", {
        nik: nik,
        password: password,
      });

      const { success, message, token } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        // Redirect to dashboard or other page
        toast({
          title: "Login Berhasil",
          status: "success",
        });

        window.location.href = "/admin";
      } else {
        setError(message);
        // Alert jika login gagal
        toast({
          title: "NIK atau Password Salah",
          status: "error",
        });
        
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <>
      {headAdmin()}
      <main>
        <Container>
            <br /><br /><br /><br /><br />
          <Heading>Login Admin</Heading>
          <form onSubmit={handleLogin}>
          <FormControl mt={4}>
              <FormLabel>NIK</FormLabel>
              <Input
                type="text"                
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
              />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>                        
            <Button mt={6} type="submit">Login</Button>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}          
        </Container>
      </main>
    </>
  );
}

export default Login;
