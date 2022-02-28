import { MouseEventHandler } from 'react';

export interface Props {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const ActionButton: React.FunctionComponent<Props> = ({
  onClick,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center flex-1 px-6 py-3 bg-green shadow-lg shadow-green/50 rounded cursor-pointer"
    >
      <p className="text-base font-demibold text-white">{children}</p>
    </div>
  );
};

export default ActionButton;
