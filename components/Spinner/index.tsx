import dynamic from 'next/dynamic'

const DynamicSpinner = dynamic(() => import('./spinner'), {
  ssr: false
})

export default function SpinnerV2() {
  return <DynamicSpinner />
}
