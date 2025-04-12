import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Confirm } from '../components/Confirm'
import { useState } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
})
function About() {
  const [isShow, setIsShow]=useState(false)
  const change=(e)=>{
    console.log(e.target.value)
    setIsShow(true)
  }
  return <div className="p-2">Hello from About!
    <Link to="/" className="[&.active]:font-bold">
      Home
    </Link>
    <input type='text' onChange={change}/>
    <Confirm isShow={isShow} isShowReLoad={true} />
  </div>
}