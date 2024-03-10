const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center bg-primary-50 flex min-h-screen w-full bg-cover bg-center">
      {children}
    </div>
  );
};

export default Layout;
