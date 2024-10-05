import Dashboard from "@/components/Admin/Dashboard/DashboardSkeleton";
import Student from "@/components/Admin/Dashboard/People/Student";
import React from "react";

export default function page() {
  return (
    <div>
      <Dashboard>
        {/* student means people (can be students, members, etc.)  */}
        <Student />
      </Dashboard>
    </div>
  );
}
