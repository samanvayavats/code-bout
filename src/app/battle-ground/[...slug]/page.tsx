import BattleGround from '@/src/components/ui/battle-ground-page'
type Props = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function BattleGroundPage({ params }: Props) {
  const resolved = await params
  const slug = resolved?.slug ?? []
  // slug->matchid/userid/problemId
  return <BattleGround matchId={slug[0]} userId={slug[1]} problemId={slug[2]} />
}
