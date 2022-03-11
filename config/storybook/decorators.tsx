import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.4/client/preview/types'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const reactQuery = (story: () => StoryFnReactReturnType): StoryFnReactReturnType => (
  <QueryClientProvider client={queryClient}>
    {story()}
    <ReactQueryDevtools />
  </QueryClientProvider>
)
