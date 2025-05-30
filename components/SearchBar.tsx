import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  onCommunityChange?: (value: string) => void;
  onCreate?: () => void;
  selectedCommunity?: string;
}

export function SearchBar({
  onSearch,
  onCommunityChange,
  onCreate,
  selectedCommunity,
}: SearchBarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto max-w-[798px]">
      <div className="flex items-center justify-between gap-5 mb-5">
        <div className="flex items-center gap-5 flex-1" ref={searchRef}>
          <button
            type="button"
            className={`${isSearchActive ? 'hidden' : 'block'} md:hidden p-2 transition-opacity duration-200`}
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <Search className="h-5 w-5" />
          </button>

          <div className={`${isSearchActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'} md:opacity-100 md:scale-100 md:block flex-1 transition-all duration-200 ease-in-out`}>
            <Input
              className="w-full max-w-[507px] h-[40px]"
              icon={Search}
              placeholder="Search"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className={`${isSearchActive ? 'opacity-0 scale-95 hidden' : 'opacity-100 scale-100 flex'} md:opacity-100 md:scale-100 md:flex items-center gap-5 transition-all duration-200 ease-in-out`}>
            <Select value={selectedCommunity} onValueChange={onCommunityChange}>
              <SelectTrigger className="w-[180px] h-[40px]">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="h-[40px]"
              variant="success"
              onClick={onCreate}
            >
              Create +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 