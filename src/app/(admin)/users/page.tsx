import React from 'react'
import PageView from './pagev'
import { getAllUser } from '@/actions/Auth';


const page = async() => {
  const Users = await getAllUser() || [];

  return (
    <div>
      <PageView Users={Users}/>
    </div>
  )
}

export default page