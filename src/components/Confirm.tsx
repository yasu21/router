import { useBlocker } from '@tanstack/react-router'
import { useRef } from 'react'

export const Confirm=(props:{isShow:boolean, isShowReLoad?:boolean})=>{
	const {isShow, isShowReLoad=true}=props
	const actionRef=useRef('FORWARD')
	const { proceed, reset, status }=useBlocker({
		shouldBlockFn: ({ action }) => {
			actionRef.current=action
			return isShow
		},
		enableBeforeUnload: isShowReLoad,
		withResolver: true,
	})
	const no=()=>{
		if(actionRef.current==='FORWARD'){
			window.history.go(-1)
		}
		reset()
	}
	return (
	  <>
			{status === 'blocked' && (
				<div>
					<p>Are you sure you want to leave?</p>
					<button onClick={proceed}>Yes</button>
					<button onClick={no}>No</button>
				</div>
			)}
	  </>
	)
}