import React, { useEffect } from 'react';
import { useRouter } from 'next/router'

const Index = () => {

  const router = useRouter()
  useEffect(() => {
    async function getAuthState() {
      if (localStorage.getItem('token')) {
        await router.push('/runs-main')
      } else {
      await router.push('/Login')
      }
    }

    getAuthState().then(() => {
    });
  }, [])

  return(<></>)
}

export default Index
