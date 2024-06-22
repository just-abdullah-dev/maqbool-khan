"use client";
import AdminHeader from '@/components/Admin/AdminHeader';
import DashboardContent from '@/components/Admin/Dashboard/DashboardContent';
import Dashboard from '@/components/Admin/Dashboard/DashboardSkeleton';
import React from 'react';

export default function page() {
  return (
    <div>
        <Dashboard>
          <DashboardContent />
        </Dashboard>
    </div>
  )
}
