import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

// tslint-disable-next-line no-empty-interface
export type Props = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const Label: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <label className="block mb-2 font-medium text-sm" {...props}>
      {children}
    </label>
  );
};

export default Label;
