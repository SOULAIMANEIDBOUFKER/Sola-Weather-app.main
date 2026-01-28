import { FavoriteCities } from "@/components/favorite-cities";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { CurrentWeather } from "../components/current-weather";
import { HourlyTemperature } from "../components/hourly-temprature";
import WeatherSkeleton from "../components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { WeatherDetails } from "../components/weather-details";
import { WeatherForecast } from "../components/weather-forecast";
import { useTranslation } from "react-i18next";

export function WeatherDashboard() {
  const { t } = useTranslation();

  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  };

  if (locationLoading) return <WeatherSkeleton />;

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t("dashboard.locationErrorTitle")}</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            {t("dashboard.enableLocation")}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>{t("dashboard.locationRequiredTitle")}</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{t("dashboard.locationRequiredMessage")}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            {t("dashboard.enableLocation")}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t("dashboard.errorTitle")}</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{t("dashboard.fetchFailed")}</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t("dashboard.retry")}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) return <WeatherSkeleton />;

  const locationName = locationQuery.data?.[0];

  return (
    <div className="space-y-4">
      <FavoriteCities />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{t("dashboard.myLocation")}</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
