"use client";

import { useMemo, useState } from "react";
import UserDetails from "@/components/admin/UserDetails";
import UserQueries from "@/components/admin/UserQueries";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/shad/card";
import { Button } from "@/ui/shad/button";
import { useSession } from "next-auth/react";
import DashboardSkeleton from "@/components/admin/DashboardSkeleton";
import UserSessions from "@/components/admin/UserSessions";
import UserPayments from "@/components/admin/UserPayments";

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession();
  const [activeTab, setActiveTab] = useState<
    "details" | "queries" | "sessions" | "payments"
  >("details");

  const adminEmails = useMemo(() => {
    return process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split("-") || [];
  }, []);

  if (authStatus === "loading") {
    return <DashboardSkeleton />;
  }

  if (!session || !adminEmails.includes(session.user?.email as string)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Access Denied
            </CardTitle>
            <CardDescription>
              You must be an administrator to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
          <CardDescription>Manage user details and queries</CardDescription>
        </CardHeader>
      </Card>

      <div className="mb-4 flex space-x-2">
        <Button
          variant={activeTab === "details" ? "outline" : "default"}
          onClick={() => setActiveTab("details")}
        >
          User Details
        </Button>
        <Button
          variant={activeTab === "queries" ? "outline" : "default"}
          onClick={() => setActiveTab("queries")}
        >
          User Queries
        </Button>
        <Button
          variant={activeTab === "payments" ? "outline" : "default"}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </Button>
        <Button
          variant={activeTab === "sessions" ? "outline" : "default"}
          onClick={() => setActiveTab("sessions")}
        >
          User Sessions
        </Button>
      </div>
      {activeTab === "details" && <UserDetails />}
      {activeTab === "queries" && <UserQueries />}
      {activeTab === "sessions" && <UserSessions />}
      {activeTab === "payments" && <UserPayments />}
    </div>
  );
}
