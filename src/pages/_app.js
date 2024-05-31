import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadAdmin } from "../component/headAdmin";
import { SidebarMenu } from "../component/SidebarMenu";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <HeadAdmin />
        <main>
          <Flex>
            <SidebarMenu flex="0 1 250px" /> {/* Anda bisa menyesuaikan lebar SidebarMenu di sini */}
            <Flex flex="1" w="100%">
              <Component {...pageProps} />
            </Flex>
          </Flex>
        </main>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
