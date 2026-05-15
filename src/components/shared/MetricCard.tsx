import React from 'react';

type Tone =
  | 'green'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'red'
  | 'gray';

type IconPosition =
  | 'top-right'
  | 'center-right';

type Layout =
  | 'default'
  | 'stacked'
  | 'inline';

type Props = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  tone?: Tone;
  compact?: boolean;
  iconPosition?: IconPosition;
  layout?: Layout;
};

export default function MetricCard({
  title,
  value,
  description,
  icon,
  tone = 'gray',
  compact = false,
  iconPosition = 'top-right',
  layout = 'default',
}: Props) {
  const colors = {
    green:
      'text-green-600 bg-green-50',
    blue:
      'text-blue-600 bg-blue-50',
    purple:
      'text-purple-600 bg-purple-50',
    orange:
      'text-orange-500 bg-orange-50',
    red:
      'text-red-500 bg-red-50',
    gray:
      'text-gray-500 bg-gray-50',
  };

  const text = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-500',
    red: 'text-red-500',
    gray: 'text-gray-500',
  };

  /**
   * STACKED
   * subtitle on its own row
   *
   * Row 1:
   * [icon] [title + value]
   *
   * Row 2:
   * subtitle full width
   */
  if (layout === 'stacked') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm min-h-[108px]">
        <div className="flex items-start gap-4">
          {icon && (
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${colors[tone]}`}
            >
              {icon}
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-slate-500 leading-none">
              {title}
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2 leading-none">
              {value}
            </h3>
          </div>
        </div>

        {description && (
          <p className="text-xs text-slate-400 mt-3 leading-tight">
            {description}
          </p>
        )}
      </div>
    );
  }

  /**
   * INLINE
   * description stays in text column
   *
   * [icon] [title]
   *        [value]
   *        [description]
   */
  if (layout === 'inline') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm min-h-[108px]">
        <div className="flex items-start gap-4">
          {icon && (
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${colors[tone]}`}
            >
              {icon}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-500 leading-none">
              {title}
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2 leading-none">
              {value}
            </h3>

            {description && (
              <p className="text-xs text-slate-400 mt-2 leading-tight">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * DEFAULT (existing behavior preserved)
   */
  const stringValue =
    String(value);

  const isLong =
    typeof value ===
      'string' &&
    stringValue.length > 6;

  const cardClass = compact
    ? 'px-5 py-4 min-h-[132px]'
    : 'p-6 min-h-[180px]';

  const valueClass = compact
    ? isLong
      ? 'text-2xl'
      : 'text-4xl'
    : isLong
    ? 'text-3xl'
    : 'text-5xl';

  return (
    <div
      className={`relative bg-white border border-gray-200 rounded-xl shadow-sm ${cardClass}`}
    >
      {icon &&
        iconPosition ===
          'top-right' && (
          <div
            className={`absolute top-4 right-5 h-8 w-8 rounded-full flex items-center justify-center ${colors[tone]}`}
          >
            {icon}
          </div>
        )}

      {icon &&
        iconPosition ===
          'center-right' && (
          <div
            className={`absolute right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center ${colors[tone]}`}
          >
            {icon}
          </div>
        )}

      <p className="text-[13px] font-medium text-gray-500 leading-snug pr-14">
        {title}
      </p>

      <div className="mt-4 pr-14">
        <h3
          className={`font-semibold tracking-tight text-slate-900 leading-tight ${valueClass}`}
        >
          {value}
        </h3>

        {description && (
          <p
            className={`text-xs mt-3 leading-snug ${text[tone]}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}