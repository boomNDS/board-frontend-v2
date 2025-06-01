import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { CreatePost } from "@/components/CreatePost";
import { communityOptions } from "@/lib/types/post.types";

interface SearchBarProps {
  onSearch: (value: string) => void;
  onCommunityChange: (value: string | undefined) => void;
  selectedCommunity?: string;
  initialSearch?: string;
  onCreate?: () => void;
}

export function SearchBar({
  onSearch,
  onCommunityChange,
  selectedCommunity,
  initialSearch = "",
  onCreate,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="mx-auto max-w-[798px]">
      <div className="flex items-center justify-between gap-5 mb-5">
        <div className="flex items-center gap-5 flex-1" ref={searchRef}>
          <button
            type="button"
            className={`${isSearchActive ? "hidden" : "block"} md:hidden p-2 transition-opacity duration-200`}
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <Search className="h-5 w-5" />
          </button>

          <div
            className={`${isSearchActive ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} md:opacity-100 md:scale-100 md:block flex-1 transition-all duration-200 ease-in-out`}
          >
            <Input
              className="w-full max-w-[507px] h-[40px]"
              icon={Search}
              placeholder="Search"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div
            className={`${isSearchActive ? "opacity-0 scale-95 hidden" : "opacity-100 scale-100 flex"} md:opacity-100 md:scale-100 md:flex items-center gap-5 transition-all duration-200 ease-in-out`}
          >
            <Select value={selectedCommunity} onValueChange={onCommunityChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select Community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {communityOptions.map((community) => (
                  <SelectItem key={community} value={community}>
                    {community}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CreatePost onSuccess={() => onCreate?.()} />
          </div>
        </div>
      </div>
    </div>
  );
}
