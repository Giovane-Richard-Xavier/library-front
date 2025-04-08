// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { initQueryClient } from "@ts-rest/react-query";

// type childrenProps = {
//   children: React.ReactNode;
// };

// // export const client = initQueryClient(librayContract, {
// //   baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
// //   baseHeaders: {},
// //   jsonQuery: true,
// // });

// const queryClient = new QueryClient();

// export const ReactQueryClientProvider = ({ children }: childrenProps) => {
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  // Garante que o QueryClient seja criado apenas uma vez
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, 
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
