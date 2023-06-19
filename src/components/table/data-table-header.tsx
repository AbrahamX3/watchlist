export default function DataTableHeader({
  mobileTitle,
  desktopTitle,
  children,
}: {
  mobileTitle: string;
  desktopTitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="my-4 flex w-full justify-between rounded-md align-middle">
      <p className="text-2xl font-bold sm:hidden">{mobileTitle}</p>
      <p className="hidden text-2xl font-bold sm:flex">{desktopTitle}</p>
      {children}
    </div>
  );
}
