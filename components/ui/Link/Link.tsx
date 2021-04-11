import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a
        className="font-bold text-gray-700 dark:text-yellow-200 no-underline hover:text-black dark:hover:text-yellow-300"
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
