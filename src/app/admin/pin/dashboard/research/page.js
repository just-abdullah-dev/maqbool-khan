import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Research from '@/components/Admin/Dashboard/Research/Research'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Research />
        </Dashboard>
    </div>
  )
}
