export default function TableContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full p-4">{children}</div>;
}
