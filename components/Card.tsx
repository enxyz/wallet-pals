const Card: React.FunctionComponent = ({ children }) => {
  return (
    <div className="rounded-md bg-cream border-gray-400 border p-10">
      {children}
    </div>
  );
};

export default Card;
