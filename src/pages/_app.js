import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import './app.css'

export default function MyApp({Component, pageProps}) {
  debugContextDevtool(Component, {
    debugReducer: true, debugContext:
      true, disable: process.env.NODE_ENV === 'production'
  });
  return (<Component {...pageProps} />);
}
