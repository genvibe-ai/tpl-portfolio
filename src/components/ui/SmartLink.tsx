import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** True for site pages ("/about", "/#work"); files like "/resume.pdf" stay normal links. */
export const isRoute = (href: string) => href.startsWith('/') && !/\.[a-z0-9]{2,5}(?:$|[?#])/i.test(href)

/** Site pages use the router (with the page transition); everything else is a normal link. */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink({ href, ...props }, ref) {
  if (isRoute(href)) return <Link ref={ref} to={href} {...props} />
  const external = /^https?:\/\//.test(href)
  return <a ref={ref} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props} />
})
