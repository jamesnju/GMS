import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div><Loader className='animate text-gray-400 animate-spin flex text-center mx-auto h-50 w-50 justify-center'/></div>
  )
}

export default loading