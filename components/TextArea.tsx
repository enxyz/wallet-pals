import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: React.FunctionComponent<Props> = ({ ...props }) => {
  return (
    <div className="flex border rounded border-gray-400 bg-white">
      <textarea
        className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        rows={4}
        placeholder="0x8c8...1cC0&#10;0x9a3...89d3&#10;ens-name.eth"
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;
