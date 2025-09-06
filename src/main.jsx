import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartDrawerProvider } from './context/CartDrawerContext';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from 'react-hot-toast';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
console.log("Stripe loaded:", stripePromise);


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartDrawerProvider>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <App />
            <Toaster
              position="top-right" // 👈 you can choose top-center, bottom-right, etc.
              reverseOrder={false}
            />
          </Elements>
          {/* Devtools - show initially closed */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </CartDrawerProvider>
);
