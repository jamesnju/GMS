import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div><Loader className='animate text-gray-600 animate-spin w-full center m-auto h-90 w-90' size={40}/></div>
  )
}

export default loading