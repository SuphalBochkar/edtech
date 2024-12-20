"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Clipboard,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shad/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shad/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shad/card";
import { Input } from "@/ui/shad/input";
import { Badge } from "@/ui/shad/badge";
import { Button } from "@/ui/shad/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shad/dropdown";
import QueriesSkeleton from "./QueriesSkeleton";

// Types
type Query = {
  id: string;
  user?: { name: string; email: string };
  message: string;
  status: "PENDING" | "RESOLVED" | "ERROR";
  createdAt: string;
};

type SortField = "status" | "createdAt" | "user";
type FilterStatus = "ALL" | "PENDING" | "RESOLVED" | "ERROR";

// Utility functions
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: Query["status"]) => {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    RESOLVED: "bg-green-100 text-green-800 hover:bg-green-200",
    ERROR: "bg-red-100 text-red-800 hover:bg-red-200",
  };
  return colors[status];
};

export default function UserQueries() {
  const { data: session, status: authStatus } = useSession();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  const adminEmails = useMemo(() => {
    return process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split("-") || [];
  }, []);

  const fetchQueries = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/admin/queries");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch queries");

      setQueries(
        data.queries.map((q: Query) => ({
          ...q,
          createdAt: new Date(q.createdAt).toISOString(),
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshQueries = async () => {
    setRefreshing(true);
    await fetchQueries();
    setRefreshing(false);
  };

  const updateStatus = async (id: string, status: Query["status"]) => {
    setError(null);
    try {
      const response = await fetch("/api/admin/queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update query status");
      }

      await fetchQueries();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
      console.error("Error updating query:", err);
    }
  };

  useEffect(() => {
    if (session && adminEmails.includes(session.user?.email as string)) {
      fetchQueries();
    } else {
      setLoading(false);
    }
  }, [session, adminEmails]);

  const filteredAndSortedQueries = useMemo(() => {
    return [...queries]
      .filter((query) => {
        const matchesSearch =
          query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || query.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const modifier = sortOrder === "asc" ? 1 : -1;
        if (sortField === "user") {
          return (
            modifier * (a.user?.name || "").localeCompare(b.user?.name || "")
          );
        }
        if (sortField === "status") {
          return modifier * a.status.localeCompare(b.status);
        }
        return modifier * a.createdAt.localeCompare(b.createdAt);
      });
  }, [queries, searchTerm, statusFilter, sortField, sortOrder]);

  if (authStatus === "loading" || loading) {
    return <QueriesSkeleton />;
  }

  const handleCopyToClipboard = (email: string | undefined | null) => {
    if (email === undefined || email === null) return;
    navigator.clipboard.writeText(email);
  };

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
    <Card className="container mx-auto p-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Admin Dashboard
            </CardTitle>
            <CardDescription>
              Manage and track user support requests
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search queries..."
                className="pl-8 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter: {statusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-background shadow-lg border">
                <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>
                  All Queries
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>
                  Pending Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("RESOLVED")}>
                  Resolved Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("ERROR")}>
                  Error Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              onClick={refreshQueries}
              disabled={refreshing}
              className="w-full sm:w-auto"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => {
                      setSortField("user");
                      setSortOrder(
                        sortField === "user" && sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                    className="cursor-pointer"
                  >
                    User{" "}
                    {sortField === "user" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="min-w-[300px] max-w-[500px]">
                    Message
                  </TableHead>
                  <TableHead
                    onClick={() => {
                      setSortField("status");
                      setSortOrder(
                        sortField === "status" && sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                    className="cursor-pointer"
                  >
                    Status{" "}
                    {sortField === "status" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => {
                      setSortField("createdAt");
                      setSortOrder(
                        sortField === "createdAt" && sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                    className="cursor-pointer"
                  >
                    Date{" "}
                    {sortField === "createdAt" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedQueries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No queries found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedQueries.map((query) => (
                    <TableRow key={query.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium flex items-center space-x-2">
                        <span className="flex items-center">
                          <span className="font-semibold">
                            {query.user?.name || "Anonymous"}
                          </span>
                          <span className="text-gray-500 ml-2 flex items-center gap-1">
                            {query.user?.email}
                            <Clipboard
                              width={16}
                              height={16}
                              onClick={() =>
                                handleCopyToClipboard(query.user?.email)
                              }
                              className="cursor-pointer text-gray-500 hover:text-gray-700"
                              data-tooltip="Copy email to clipboard"
                            />
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[500px] break-words whitespace-normal">
                        {query.message}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(query.status)}>
                          {query.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(query.createdAt)}</TableCell>
                      <TableCell>
                        <Select
                          value={query.status}
                          onValueChange={(value) =>
                            updateStatus(query.id, value as Query["status"])
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-background shadow-lg border">
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="RESOLVED">Resolved</SelectItem>
                            <SelectItem value="ERROR">Error</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
