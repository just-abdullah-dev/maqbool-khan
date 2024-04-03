import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton'
import Profile from '@/components/Admin/Dashboard/Profile/Profile'
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Profile />
        </Dashboard>
    </div>
  )
}
