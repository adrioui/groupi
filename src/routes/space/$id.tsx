import SpaceView from '@/components/SpaceView'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/space/$id')({
  component: SpaceRoute,
})

function SpaceRoute() {
  const { id } = Route.useParams()
  const trimmedId = id?.trim()

  if (!trimmedId) {
    throw notFound()
  }

  return <SpaceView spaceId={trimmedId} />
}
