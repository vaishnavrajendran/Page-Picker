const AuthLayout = ({ children }) => {
  return (
    //Clerk authentication
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
