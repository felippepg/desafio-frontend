// eslint-disable-next-line react/prop-types
export default function ErrorComponent({ children, onClick }) {
  return (
    <p
      className="w-2/3 bg-red-400 p-2 text-center cursor-pointer"
      onClick={onClick}
    >
      {children}
    </p>
  );
}
