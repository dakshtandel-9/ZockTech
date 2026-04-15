'use client';

import ShimmerButton from '@/components/ShimmerButton';

/**
 * GlowButton
 *
 *  variant="primary"   → ShimmerButton (orange, shimmer sweep, black text)
 *  variant="secondary" → #1a1a1a fill, white text, 1px orange border — subtle & clean
 *
 * Pass `asLink` to render an <a> instead of <button>.
 */

/* ── Secondary: clean dark with 1px orange border ── */
const BASE_SEC =
  'inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer ' +
  'rounded-lg outline-none whitespace-nowrap ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'transition-all duration-200';

const SECONDARY =
  'bg-[#1a1a1a] text-white/85 font-medium opacity-90 ' +
  'border border-[#FF9500]/50 ' +
  'hover:border-[#FF9500] hover:text-white hover:opacity-100 hover:scale-[1.02] active:scale-[0.98]';

function GlowButton({
  children,
  className = '',
  variant = 'secondary',
  asLink = false,
  href,
  target,
  rel,
  size = 'default',
  ...props
}) {
  /* ── Primary → ShimmerButton ── */
  if (variant === 'primary') {
    return (
      <ShimmerButton
        asLink={asLink}
        href={href}
        target={target}
        rel={rel}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </ShimmerButton>
    );
  }

  /* ── Secondary → clean dark button ── */
  const sizeClass =
    size === 'lg'  ? 'h-12 px-7 text-sm'  :
    size === 'sm'  ? 'h-9 px-4 text-xs'   :
                     'h-[42px] px-6 text-sm';

  const classes = [BASE_SEC, SECONDARY, sizeClass, className].join(' ');

  if (asLink) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default GlowButton;
