import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, CircleEllipsis } from 'lucide-react'

interface PhotoStatsProps {
  totalPhotos: number
  totalPending:number
}

export function PhotoStats({ totalPhotos, totalPending }: PhotoStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPhotos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Uploads</CardTitle>
          <CircleEllipsis className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPending}</div>
        </CardContent>
      </Card>
    </div>
  )
}

