import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, Clock, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { useTranslation } from "react-i18next";

export function CitySearch() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { favorites } = useFavorites();
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const formatHistoryDate = (value: any) => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat(lang, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
    };

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        {t("search.openButton")}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder={t("search.placeholder")}
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>{t("search.noCitiesFound")}</CommandEmpty>
            )}

            {favorites.length > 0 && (
              <CommandGroup heading={t("search.favorites")}>
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{city.name}</span>
                    {city.state && (
                      <span className="text-sm text-muted-foreground">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between px-2 my-2">
                    <p className="text-xs text-muted-foreground">
                      {t("search.recentSearches")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                    >
                      <XCircle className="h-4 w-4" />
                      {t("search.clear")}
                    </Button>
                  </div>

                  {history.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {item.country}
                      </span>

                      <span className="ml-auto text-xs text-muted-foreground">
                        {formatHistoryDate(item.searchedAt)}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />

            {locations && locations.length > 0 && (
              <CommandGroup heading={t("search.suggestions")}>
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}

                {locations?.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
