import React, {ReactNode} from 'react'

interface LayoutProps {
  children: ReactNode;
}
const CardLayout: React.FC<LayoutProps>  = ({children}) => {
  return (
    <div className='w-full md:w-[50%] h-full md:h-[70%] bg-white rounded-xl p-12 drop-shadow-lg border-[16px] border-candyYellow'>
      {children}
    </div>
  )
}

export default CardLayout