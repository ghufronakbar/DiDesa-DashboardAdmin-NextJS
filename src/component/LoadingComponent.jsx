import { Box, Spinner } from "@chakra-ui/react";

export function LoadingComponent({flex}) {
  return (
    <>
       <Box flex={flex} p={8} borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4} mx={4}>
        <Spinner size="lg" />
      </Box>
    </>
  );
}
