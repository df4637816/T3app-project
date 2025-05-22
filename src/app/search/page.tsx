import { Suspense } from "react";
import { searchImages } from "~/server/db/queries";
import ImageCardWrapper from "~/app/_components/ImageCardWrapper";
import LoadingGrid from "~/app/_components/LoadingGrid";
import { EmptyState } from "~/app/_components/EmptyState";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function SearchResults({ query }: { query: string }) {
  const results = await searchImages(query);

  if (results.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <EmptyState
          title="未找到相符的照片"
          description={`沒有找到與「${query}」相關的照片`}
          icons={[Search]}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((image) => (
        <Suspense
          key={image.id}
          fallback={<div className="w-48 h-64 bg-gray-200 animate-pulse rounded-lg" />}
        >
          <ImageCardWrapper
            image={{
              ...image,
              id: image.id.toString(),
              description: image.description ?? undefined,
              createdAt: image.createdAt.toISOString(),
            }}
            currentUserId={image.userId}
          />
        </Suspense>
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q ?? "";

  return (
    <main className="w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">
          搜尋結果：{query}
        </h1>
        <Suspense fallback={<LoadingGrid />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}