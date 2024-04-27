import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton';
import Gallery from '@/components/Admin/Dashboard/Gallery/Gallery';
import React from 'react'

export default function page() {
  return (
    <div>
        <Dashboard>
          <Gallery />
        </Dashboard>
    </div>
  )
}
