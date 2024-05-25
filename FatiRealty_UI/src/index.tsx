import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from 'react-query'
import queryClient from './constant/QueryClient';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
         <QueryClientProvider client={queryClient}>
            <HashRouter>
                <AppWrapper></AppWrapper>
            </HashRouter>
         </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
