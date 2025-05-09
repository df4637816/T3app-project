import { Card } from "~/components/ui/card";

export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="w-48">
          <div className="relative h-64 w-52 overflow-hidden rounded-lg bg-muted/40 animate-[pulse_2s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/10 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
          <div className="h-4 w-32 mt-2 mx-2 mb-2 bg-muted/40 rounded animate-[pulse_2s_ease-in-out_infinite]" />
        </Card>
      ))}
    </div>
  );
}