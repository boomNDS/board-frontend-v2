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
  return (
    <div className="mx-auto max-w-[798px]">
      <div className="flex items-center gap-5 mb-5">
        <Input
          className="max-w-[535px] h-[40px]"
          icon={Search}
          placeholder="Search"
          onChange={(e) => onSearch?.(e.target.value)}
        />
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
  );
} 