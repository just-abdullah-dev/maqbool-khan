import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Project from '@/components/Admin/Dashboard/Project/Project'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Project />
        </Dashboard>
    </div>
  )
}
