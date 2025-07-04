import React, { useState } from 'react';
import { Check, ChevronDown, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/types/locations';
import { getLocationsByType, searchLocations } from '@/data/locations';

interface LocationSelectorProps {
  type: 'pickup' | 'drop';
  value?: Location;
  onSelect: (location: Location) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const LocationSelector = ({ 
  type, 
  value, 
  onSelect, 
  placeholder, 
  disabled = false,
  className 
}: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const locations = searchQuery 
    ? searchLocations(searchQuery, type)
    : getLocationsByType(type);

  const handleSelect = (location: Location) => {
    onSelect(location);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {value ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">{value.areaName}</span>
                {value.distanceFromCollege && (
                  <Badge variant="secondary" className="text-xs">
                    {value.distanceFromCollege}km
                  </Badge>
                )}
              </div>
            ) : (
              placeholder || `Select ${type} location`
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder={`Search ${type} locations...`}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No locations found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.id}
                  value={location.id}
                  onSelect={() => handleSelect(location)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value?.id === location.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <div className="font-medium">{location.areaName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {location.distanceFromCollege}km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {location.estimatedTime}min
                        </span>
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;