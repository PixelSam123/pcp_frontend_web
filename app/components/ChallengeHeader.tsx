export default function ChallengeHeader({
  tier,
  title,
}: {
  tier: number
  title: string
}) {
  return (
    <p className="font-bold">
      <span className="border border-white px-1 font-normal">T{tier}</span>{' '}
      {title}
    </p>
  )
}
