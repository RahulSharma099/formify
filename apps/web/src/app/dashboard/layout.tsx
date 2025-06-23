"use client";

import Header from "../../components/Header";
import { NavigationProvider } from "@/lib/context/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex h-screen">
        <h1>SideBar</h1>
        {/* SideBar component */}

        <div className="flex-1 ">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}
