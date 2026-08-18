import ResultsPage from '@/src/components/ui/results-page'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <>
      <ResultsPage matchId={id} />
    </>
  )
}

export default page
