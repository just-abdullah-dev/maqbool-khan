import Layout from '@/components/Layout/Layout'
import Publications from '@/components/Pages/Publications/Publications'
import { getAll } from '@/services/utils'
import React from 'react'

export default async function page() {
    const publiData = await getAll("maqboolkhan", "publications");
    const researchData = await getAll("maqboolkhan", "research");
console.log(researchData);
  return (
    <Layout>
        <Publications data={publiData} />
    </Layout>
  )
}
