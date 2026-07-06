export default function Button({ children, onClick }) {
  return <div onClick={onClick}>{children}</div>;
}
