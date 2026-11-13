import { type PropsWithChildren } from "react";
import cn from 'clsx'

interface Props extends PropsWithChildren {
  isPlayer: boolean
}

export function SectionSide({isPlayer, children} : Props) {
  return (
    <section className={cn('absolute w-full h-[50vh] left-0', {
      'top-0': !isPlayer,
      'bottom-0': isPlayer
    })}>
      {children}
    </section>
  )
}