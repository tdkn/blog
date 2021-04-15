import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const InlineCode = ({ className, ...props }: Props) => {
  return (
    <code
      className={clsx(
        "rounded-md p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-yellow-300 leading-loose",
        className
      )}
      {...props}
    />
  );
};

export default InlineCode;
