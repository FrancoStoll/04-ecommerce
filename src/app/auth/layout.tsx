


export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-500 min-h-screen">
      {children}
    </div>
  );
}