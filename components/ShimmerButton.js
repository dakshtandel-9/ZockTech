'use client';

/**
 * ShimmerButton — orange-themed primary button.
 *
 * - background: #FF9500 (brand orange)
 * - shimmerColor: white sweeping light effect
 * - text: black (high contrast on orange)
 * - borderRadius: 8px (rounded-lg, matches site design)
 *
 * Props:
 *   shimmerColor   (default '#ffffff')
 *   shimmerSize    (default '0.05em')
 *   shimmerDuration(default '3s')
 *   borderRadius   (default '8px')
 *   background     (default '#FF9500')
 *   size           'sm' | 'default' | 'lg'
 *   asLink         render as <a> if true
 *   href, target, rel — passed through when asLink=true
 */

function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '8px',
  background = '#FF9500',
  className = '',
  children,
  size = 'default',
  asLink = false,
  href,
  target,
  rel,
  ...props
}) {
  const sizeClass =
    size === 'lg' ? 'h-14 px-8 text-base font-semibold' :
    size === 'sm' ? 'h-10 px-4 text-xs font-semibold'   :
                    'h-12 px-7 text-sm font-semibold';

  const style = {
    '--spread': '90deg',
    '--shimmer-color': shimmerColor,
    '--radius': borderRadius,
    '--speed': shimmerDuration,
    '--cut': shimmerSize,
    '--bg': background,
  };

  const inner = (
    <>
      {/* Spark container */}
      <div
        className="-z-30 blur-[2px] absolute inset-0 overflow-visible"
        style={{ containerType: 'size' }}
      >
        <div className="animate-shimmer-slide absolute inset-0 rounded-none"
          style={{ aspectRatio: '1', height: '100cqh', mask: 'none' }}
        >
          <div className="animate-spin-around absolute w-auto rotate-0"
            style={{
              inset: '-100%',
              background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))`,
              translate: '0 0',
            }}
          />
        </div>
      </div>

      {children}

      {/* Highlight */}
      <div
        className="absolute inset-0 size-full rounded-lg px-4 py-1.5 shadow-[inset_0_-8px_10px_#ffffff2a] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff4a] group-active:shadow-[inset_0_-10px_10px_#ffffff4a]"
      />

      {/* Backdrop */}
      <div
        className="absolute -z-20"
        style={{
          inset: 'var(--cut)',
          borderRadius: 'var(--radius)',
          background: 'var(--bg)',
        }}
      />
    </>
  );

  const baseClass = [
    'group relative z-0 flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden',
    'border border-white/10',
    'text-black',
    'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
    'hover:scale-[1.03] active:scale-[0.97]',
    sizeClass,
    className,
  ].join(' ');

  const inlineStyle = {
    ...style,
    borderRadius: borderRadius,
    background: background,
  };

  if (asLink) {
    return (
      <a href={href} target={target} rel={rel} className={baseClass} style={inlineStyle} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <button className={baseClass} style={inlineStyle} {...props}>
      {inner}
    </button>
  );
}

export default ShimmerButton;
