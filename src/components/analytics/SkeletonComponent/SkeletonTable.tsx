import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SkeletonTable = () => {
  return (
    <div className="flex flex-col space-y-20  pt-10">
      <Skeleton className="h-[100px] w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-[35vh] w-full" />

        <div className="flex items-start justify-between gap-20 w-[50vw]">
          <div className="flex items-start gap-20 w-full">
            <Skeleton className="h-[30px] w-[110px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
          <Skeleton className="h-10 w-[400px]" />
        </div>
      </div>
    </div>
  );
};
