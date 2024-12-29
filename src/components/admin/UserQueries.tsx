"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Clipboard,
  MessageSquare,
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
import { getQueries, updateQueryStatus } from "@/actions/admin.actions";

// Types
type Query = {
  id: string;
  user?: { name: string | null; email: string } | null;
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
    PENDING: "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20",
    RESOLVED: "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
    ERROR: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
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
      const result = await getQueries();
      if (result.error) {
        throw new Error(result.error);
      }

      if (result.queries) {
        setQueries(
          result.queries.map((q) => ({
            ...q,
            status: q.status as Query["status"],
          }))
        );
      }
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

  const handleUpdateStatus = async (id: string, status: Query["status"]) => {
    setError(null);
    try {
      const result = await updateQueryStatus(id, status);
      if (result.error) {
        throw new Error(result.error);
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

  if (!session || !adminEmails.includes(session.user?.email as string)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md border-violet-500/20 bg-black/50 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
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

  return (
    <Card className="border-violet-500/20 bg-black/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-violet-400" />
              Support Queries
            </CardTitle>
            <CardDescription className="text-violet-300">
              Manage and track user support requests
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />
              <Input
                placeholder="Search queries..."
                className="pl-9 w-full sm:w-64 bg-violet-500/10 border-violet-500/20 text-violet-100 placeholder:text-violet-400/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/30"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter: {statusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-violet-500/20 text-violet-100">
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
              className="bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/30"
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
          <div className="mb-4 p-4 rounded-xl border border-red-500/20 bg-red-500/10 backdrop-blur-sm text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="rounded-xl border border-violet-500/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-violet-500/20 hover:bg-violet-500/5">
                <TableHead
                  onClick={() => {
                    setSortField("user");
                    setSortOrder(
                      sortField === "user" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  User{" "}
                  {sortField === "user" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-violet-300">Message</TableHead>
                <TableHead
                  onClick={() => {
                    setSortField("status");
                    setSortOrder(
                      sortField === "status" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
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
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  Date{" "}
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-violet-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedQueries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-violet-300"
                  >
                    No queries found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedQueries.map((query) => (
                  <TableRow
                    key={query.id}
                    className="border-violet-500/20 hover:bg-violet-500/5"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-violet-200">
                          {query.user?.name || "Anonymous"}
                        </span>
                        <span className="text-sm text-violet-400 flex items-center gap-1">
                          {query.user?.email}
                          <Clipboard
                            className="h-3 w-3 cursor-pointer hover:text-violet-300"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                query.user?.email || ""
                              )
                            }
                          />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[500px] break-words whitespace-normal text-violet-200">
                      {query.message}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(query.status)}>
                        {query.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-violet-300">
                      {formatDate(query.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={query.status}
                        onValueChange={(value) =>
                          handleUpdateStatus(query.id, value as Query["status"])
                        }
                      >
                        <SelectTrigger className="w-[130px] bg-violet-500/10 border-violet-500/20 text-violet-300">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-violet-500/20 text-violet-100">
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
      </CardContent>
    </Card>
  );
}
