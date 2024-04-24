import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Publications from '@/components/Admin/Dashboard/Publications/Publications'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Publications />
        </Dashboard>
    </div>
  )
}
