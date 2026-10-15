import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { OTHER_COUNTRIES, TOP_COUNTRIES, countryByCode, type Country } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  value: string;
  onChange: (code: string) => void;
}

function Row({ c, selected, onPick }: { c: Country; selected: boolean; onPick: () => void }) {
  return (
    // cmdk filters on `value`: name + code + the flag-less "pk" style code, so "uae" / "PK" / "pakis" all work.
    <CommandItem value={`${c.name} ${c.code}`} onSelect={onPick}>
      <span className="w-7 text-center text-xl leading-none" aria-hidden>
        {c.flag}
      </span>
      <span className="flex-1 truncate">{c.name}</span>
      <span className="text-sm text-muted-foreground">{c.code}</span>
      <Check className={cn("size-4 text-primary", selected ? "opacity-100" : "opacity-0")} />
    </CommandItem>
  );
}

export function CountrySelect({ id, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = countryByCode(value);
  const pick = (code: string) => {
    onChange(code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Country"
          className="flex h-12 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-left text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            {selected ? (
              <>
                <span className="text-xl leading-none" aria-hidden>
                  {selected.flag}
                </span>
                <span className="truncate">{selected.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select country</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[16rem] p-0">
        {/* Plain substring match: cmdk's default fuzzy match lets "arab" hit Bulgaria. */}
        <Command filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)}>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup heading="Popular">
              {TOP_COUNTRIES.map((c) => (
                <Row key={c.code} c={c} selected={c.code === value} onPick={() => pick(c.code)} />
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="All countries">
              {OTHER_COUNTRIES.map((c) => (
                <Row key={c.code} c={c} selected={c.code === value} onPick={() => pick(c.code)} />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
