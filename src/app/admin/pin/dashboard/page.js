"use client";
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import React from 'react'
// import { useSelector } from 'react-redux';

export default function page() {
  // let {userInfo} = useSelector((state)=> state.user);
  // userInfo = userInfo?.data;
  return (
    <div>
        <Dashboard>
            <div>
              <div>
                <h1>Welcome Back!</h1>
                {/* <h1>{userInfo?.name?.title}. {userInfo?.name?.first}</h1>
                 */}
                 Name
              </div>
            </div>
        </Dashboard>
    </div>
  )
}
