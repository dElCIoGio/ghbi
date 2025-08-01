import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { Toaster } from "@/components/ui/sonner"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <App />
              <Toaster />
          </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
