import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShadcn,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  onSizeChange,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    router.push(
      `${pathname}?${createQueryString("page", newPage.toString())}`,
      { scroll: false }
    );
  };

  const handleSizeChange = (newSize: number) => {
    onSizeChange(newSize);
    router.push(
      `${pathname}?${createQueryString("size", newSize.toString())}`,
      { scroll: false }
    );
  };

  const pages = useMemo(() => {
    const pagesArray = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pagesArray.push(i);
      }
    } else if (currentPage <= Math.floor(maxVisiblePages / 2)) {
      for (let i = 0; i < maxVisiblePages; i++) {
        pagesArray.push(i);
      }
    } else if (currentPage >= totalPages - Math.ceil(maxVisiblePages / 2)) {
      for (let i = totalPages - maxVisiblePages; i < totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      for (
        let i = currentPage - Math.floor(maxVisiblePages / 2);
        i <= currentPage + Math.floor(maxVisiblePages / 2);
        i++
      ) {
        pagesArray.push(i);
      }
    }

    return pagesArray;
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="hidden md:flex items-center justify-between gap-2 max-w-[300px] w-full">
          <span className="text-sm text-muted-foreground">
            Página {currentPage + 1} de {totalPages}
          </span>
          <select
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>
        </div>

        <PaginationShadcn>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  currentPage === 0
                    ? "pointer-events-none text-muted"
                    : "cursor-pointer"
                }
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            {pages[0] > 0 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === 0}
                    onClick={() => handlePageChange(0)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {pages[0] > 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pages[pages.length - 1] < totalPages - 1 && (
              <>
                {pages[pages.length - 1] < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === totalPages - 1}
                    onClick={() => handlePageChange(totalPages - 1)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                className={
                  currentPage === totalPages - 1
                    ? "pointer-events-none text-muted"
                    : "cursor-pointer"
                }
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationShadcn>
      </div>
    </div>
  );
};
