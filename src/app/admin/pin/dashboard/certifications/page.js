import Certifications from '@/components/Admin/Dashboard/Certiications/Certifications'
import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Certifications />
        </Dashboard>
    </div>
  )
}
