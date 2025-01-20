import { getUserById } from '@/actions/User';
import EditUser from '@/Globalcomponents/admin/EditUser';
import React from 'react'

interface Pageprops{
    params: {id : number;}
}

const page = async({params}: Pageprops) => {
    const {id} = params;

    const userData = await getUserById(id) || [];
  return (
    <div><EditUser userData={userData}/></div>
  )
}

export default page