import { Info, TrendingUp, type LucideIcon } from "lucide-react";
import { InfoTooltip } from "@/components/info-tooltip";
import type { IndicatorKey } from "@/lib/indicator-definitions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  statLabel?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  info?: string;
  indicator?: IndicatorKey;
  onClick?: () => void;

  /** Renders multiple values stacked vertically with sub-labels */
  breakdown?: Array<{
    label: string;
    value: string | number;
  }>;

  /** Makes the primary value larger */
  emphasis?: boolean;
}

export function AnalyticCard({
  icon: Icon,
  value,
  label,
  statLabel,
  trend,
  info,
  indicator,
  onClick,
  breakdown,
  emphasis = false,
}: StatCardProps) {
  const Wrapper: React.ElementType = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={`relative flex flex-col justify-between rounded-xl  border border-teal/15 bg-white p-4 text-left shadow-sm transition-colors hover:border-teal/30 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* <div className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-teal" /> */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-soft">
            <Icon className="h-4 w-4 text-teal" />
          </div>

          {/* Value / Breakdown */}
          <>
            {breakdown ? (
              <div className="space-y-1">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-teal">
                      {item.label}
                    </span>

                    <span className="text-lg font-bold tabular-nums text-teal-950">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`font-bold text-teal-950 ${emphasis ? "text-3xl" : "text-2xl"}`}>
                {value}
              </div>
            )}
            {statLabel && <span className="text-[13px] font-medium text-teal">{statLabel}</span>}
          </>
        </div>

        {/* Info / Indicator / Trend */}
        <div className="flex items-center gap-2">
          {indicator ? (
            <InfoTooltip indicator={indicator} />
          ) : info ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-teal/50 hover:text-teal">
                    <Info className="h-3.5 w-3.5" />
                  </span>
                </TooltipTrigger>

                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}

          {trend && <Trend value={trend.value} positive={!!trend.positive} />}
        </div>
      </div>

      {/* Label */}
      <span className="mt-3 text-[14px] font-medium text-teal">{label}</span>
    </Wrapper>
  );
}

function Trend({ value, positive }: { value: string; positive: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-teal">
      <TrendingUp className={`h-3 w-3 ${positive ? "" : "rotate-180 opacity-60"}`} />
      {value}
    </span>
  );
}
