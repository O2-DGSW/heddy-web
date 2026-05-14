import type { ComponentType, SVGProps } from 'react'

import { font, lightTheme } from '@design-tokens'
import HomeIcon from './assets/home.svg?react'
import HairShopIcon from './assets/hair-shop.svg?react'
import ReservationIcon from './assets/reservate.svg?react'
import CutsIcon from './assets/cuts.svg?react'
import ProfileIcon from './assets/profile.svg?react'

import { useLocation, useNavigate } from 'react-router-dom'

interface BarComponentsProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  to?: string
}

const BarComponents = ({ Icon, title, to }: BarComponentsProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === to
  const iconColor = isActive
    ? lightTheme.background.normal
    : lightTheme.line.normal

  return (
    <button
      className="w-[90%]"
      onClick={() => {
        if (to) navigate(to)
      }}
    >
      <div className="flex flex-col justify-center items-center gap-[0.25rem]">
        <div
          className="p-[0.2rem] rounded-lg"
          style={{
            backgroundColor: isActive ? lightTheme.primary.normal : 'transparent',
          }}
        >
          <Icon
            aria-hidden="true"
            className="w-[2.1875rem] h-[2.125rem]"
            style={{ color: iconColor }}
          />
        </div>

        <p
          className={font.label.medium}
          style={{
            color: isActive ? lightTheme.primary.normal : lightTheme.line.normal,
          }}
        >
          {title}
        </p>
      </div>
    </button>
  )
}

export const BottomBar = () => {
  return (
    <div
      className="flex fixed bottom-0 left-0 w-full rounded-2xl p-[0.5rem]
      shadow-[0_-2px_6px_rgba(0,0,0,0.05)]"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <BarComponents Icon={HomeIcon} title="홈" to="/" />
      <BarComponents Icon={ReservationIcon} title="예약" to="/reservation" />
      <BarComponents Icon={CutsIcon} title="시술" to="/cuts" />
      <BarComponents Icon={HairShopIcon} title="미용실" to="/shop" />
      <BarComponents Icon={ProfileIcon} title="프로필" to="/profile" />
    </div>
  )
}
