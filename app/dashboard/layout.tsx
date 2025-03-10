import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className=" p-2">
      <div className="">{children}</div>
    </section>
  );
};

export default Layout;
