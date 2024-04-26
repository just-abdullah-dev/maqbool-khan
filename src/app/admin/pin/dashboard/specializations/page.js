import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Specializations from '@/components/Admin/Dashboard/Specialization/Specializations'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Specializations />
        </Dashboard>
    </div>
  )
}
