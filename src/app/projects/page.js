import Layout from '@/components/Layout/Layout'
import Projects from '@/components/Pages/Projects/Projects';
import { getAll } from '@/services/utils'
import React from 'react'

export default async function page() {
    const projectData = await getAll("maqboolkhan", "projects");

  return (
    <Layout>
        <Projects data={projectData} />
    </Layout>
  )
}
