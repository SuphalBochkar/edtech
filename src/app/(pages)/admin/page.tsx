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
import UserEnrollments from "@/components/admin/UserEnrollments";
import {
  Search,
  MessageSquare,
  Users,
  CreditCard,
  GraduationCap,
  Clock,
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession();
  const [activeTab, setActiveTab] = useState<
    "details" | "queries" | "sessions" | "payments" | "enrollments"
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
        <Card className="w-full max-w-md border-red-500/20 bg-black/50 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
              <ShieldAlert className="h-6 w-6 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
              Access Denied
            </CardTitle>
            <CardDescription className="text-violet-300">
              You must be an administrator to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const tabs = [
    {
      id: "details" as const,
      label: "User Details",
      icon: Search,
    },
    {
      id: "queries" as const,
      label: "User Queries",
      icon: MessageSquare,
    },
    {
      id: "sessions" as const,
      label: "Sessions",
      icon: Clock,
    },
    {
      id: "payments" as const,
      label: "Payments",
      icon: CreditCard,
    },
    {
      id: "enrollments" as const,
      label: "Enrollments",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-8 border-violet-500/20 bg-black/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-violet-300">
                Manage user details, queries, and system settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`h-11 px-4 flex items-center gap-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-violet-500/20 text-violet-200 border-violet-500/30"
                  : "bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/15 hover:border-violet-500/25"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {activeTab === "details" && <UserDetails />}
      {activeTab === "queries" && <UserQueries />}
      {activeTab === "sessions" && <UserSessions />}
      {activeTab === "payments" && <UserPayments />}
      {activeTab === "enrollments" && <UserEnrollments />}
    </div>
  );
}
