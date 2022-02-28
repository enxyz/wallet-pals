import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface Props extends NextLinkProps {
  external?: boolean;
}

const Link: React.FunctionComponent<Props> = ({
  children,
  external = false,
  ...props
}) => {
  const anchorProps = external ? { target: '_blank' } : {};
  return (
    <NextLink {...props}>
      <a className="text-blue font-normal" {...anchorProps}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
