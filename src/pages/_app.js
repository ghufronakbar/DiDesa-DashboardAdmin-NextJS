import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadAdmin } from "../component/headAdmin";
import { SidebarMenu } from "../component/SidebarMenu";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <HeadAdmin />
        <main>
          {router.pathname != `/admin/login` ?
            (
              <>
                <Flex>
                  <SidebarMenu flex="0 1 250px" />
                  <Flex flex="1" w="100%">
                    <Component {...pageProps} />
                  </Flex>
                </Flex>
              </>
            )
            : <Component {...pageProps} />
          }

        </main>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
