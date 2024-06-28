import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton';
import Student from '@/components/Admin/Dashboard/Student/Student';
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Student />
        </Dashboard>
    </div>
  )
}
