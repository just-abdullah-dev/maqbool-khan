import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Education from '@/components/Admin/Dashboard/Education/Education'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Education />
        </Dashboard>
    </div>
  )
}
