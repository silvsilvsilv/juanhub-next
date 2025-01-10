"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'


export function LoadingButton({ 
  ...props 
}) {

  const handleAction = () => {
    if (props.isLoading) return

    props.setIsLoading(true)
    
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleAction()
    props.onClick?.(event)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      handleAction()
    }
    props.onKeyDown?.(event)
  }

  return (
    <Button 
      {...props} 
      onClick={handleClick} 
      onKeyDown={handleKeyDown}
      disabled={props.isLoading || props.disabled}
    >
      {props.isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {"Loading"}
        </>
      ) : ("Login")}
    </Button>
  )
}

