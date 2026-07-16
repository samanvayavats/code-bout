import WaitingPage from '@/src/components/ui/waiting-page'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <div>
      {id}
      <WaitingPage problemId={id} />
    </div>
  )
}

export default page
