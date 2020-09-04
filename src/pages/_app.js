import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { debugContextDevtool } from 'react-context-devtool';
import './app.css'

export default function MyApp({Component, pageProps}) {
  debugContextDevtool(Component, { debugReducer: true, debugContext: true });
  return (<Component {...pageProps} />);
}
