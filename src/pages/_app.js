import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import './app.css'

export default function MyApp({Component, pageProps}) {
  return (<Component {...pageProps} />);
}
