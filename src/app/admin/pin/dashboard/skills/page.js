import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Skills from '@/components/Admin/Dashboard/Skills/Skills'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Skills />
        </Dashboard>
    </div>
  )
}
