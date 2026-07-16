type Props = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function BattleGroundPage({ params }: Props) {
  const resolved = await params
  const slug = resolved?.slug ?? []

  return (
    <div>
      <p>Match ID: {slug[0]}</p>
      <p>user ID: {slug[1]}</p>
      <p>Problem ID: {slug[2]}</p>
    </div>
  )
}
