import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import '../src/App.css'

export default function MyApp({Component, pageProps}) {
  return (<Component {...pageProps} />);
}


