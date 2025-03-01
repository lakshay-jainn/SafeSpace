import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  hasImage?: boolean
}

export default function SkeletonCard({ hasImage = false }: SkeletonCardProps) {
  return (
    <div className="w-full rounded-3xl">
      <div className="bg-white rounded-3xl p-6 space-y-6 gradient-border">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-20" />
          {hasImage && <Skeleton className="w-full aspect-[16/9] rounded-lg" />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}

