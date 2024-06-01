import Layout from '@/components/Layout/Layout'
import Publications from '@/components/Pages/Publications/Publications'
import Researchs from '@/components/Pages/Research/Researchs';
import { getAll } from '@/services/utils'
import React from 'react'

export default async function page() {
    const publiData = await getAll("maqboolkhan", "publications");
    const researchData = await getAll("maqboolkhan", "research");
console.log(researchData);
  return (
    <Layout>
      <div>
        <button>Publications</button>
        <button>Research</button>
      </div>
        <Publications data={publiData} />
        <Researchs data={publiData} />
    </Layout>
  )
}
