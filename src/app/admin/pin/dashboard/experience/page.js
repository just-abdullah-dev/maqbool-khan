import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Experience from '@/components/Admin/Dashboard/Experience/Experience'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Experience />
        </Dashboard>
    </div>
  )
}
