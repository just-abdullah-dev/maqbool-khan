import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page({params}) {
  return (
    <Layout>
        
    <div>gallery country ({params?.country}) page </div>
    </Layout>
  )
}
