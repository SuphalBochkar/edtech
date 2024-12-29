"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Clipboard,
  IndianRupee,
  CreditCard,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shad/table";
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
import { getPayments } from "@/actions/admin.actions";
import { Course, CourseNames } from "@/lib/data";
import PaymentsSkeleton from "./PaymentsSkeleton";

type Payment = {
  id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  razorpay_order_id: string;
  course: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string | null;
  user: {
    name: string | null;
    email: string;
  };
};

type SortField = "status" | "createdAt" | "user" | "course" | "amount";
type FilterStatus = "ALL" | "PENDING" | "SUCCESS" | "FAILED";

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: Payment["status"]) => {
  const colors = {
    PENDING: "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20",
    SUCCESS: "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
    FAILED: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
  };
  return colors[status];
};

export default function UserPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  const fetchPayments = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await getPayments();
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.payments) {
        setPayments(result.payments);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPayments = async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredAndSortedPayments = payments
    .filter((payment) => {
      const matchesSearch =
        payment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.razorpay_payment_id
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.razorpay_order_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "user":
          return (
            modifier * (a.user.name || "").localeCompare(b.user.name || "")
          );
        case "status":
          return modifier * a.status.localeCompare(b.status);
        case "course":
          return modifier * a.course.localeCompare(b.course);
        case "amount":
          return modifier * (a.amount - b.amount);
        case "createdAt":
          return (
            modifier * (a.createdAt || "").localeCompare(b.createdAt || "")
          );
        default:
          return 0;
      }
    });

  if (loading) {
    return <PaymentsSkeleton />;
  }

  return (
    <Card className="border-violet-500/20 bg-black/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-violet-400" />
              Payment History
            </CardTitle>
            <CardDescription className="text-violet-300">
              View and manage payment records
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />
              <Input
                placeholder="Search payments..."
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
                  All Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>
                  Pending Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("SUCCESS")}>
                  Successful Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("FAILED")}>
                  Failed Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              onClick={refreshPayments}
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
                <TableHead
                  onClick={() => {
                    setSortField("course");
                    setSortOrder(
                      sortField === "course" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  Course{" "}
                  {sortField === "course" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => {
                    setSortField("amount");
                    setSortOrder(
                      sortField === "amount" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  Cost{" "}
                  {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
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
                  className="text-violet-300 cursor-pointer hover:text-violet-200"
                >
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-violet-300">
                  Payment Details
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-violet-300"
                  >
                    No payments found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-violet-500/20 hover:bg-violet-500/5"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-violet-200 font-medium">
                          {payment.user.name || "Anonymous"}
                        </span>
                        <span className="text-sm text-violet-400 flex items-center gap-1">
                          {payment.user.email}
                          <Clipboard
                            className="h-3 w-3 cursor-pointer hover:text-violet-300"
                            onClick={() =>
                              navigator.clipboard.writeText(payment.user.email)
                            }
                          />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-violet-200">
                        {CourseNames[payment.course as Course]}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-violet-200">
                        <IndianRupee className="h-4 w-4 text-violet-400" />
                        <span>{payment.amount.toLocaleString("en-IN")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-violet-300">
                            Order ID:
                          </span>
                          <span className="text-sm font-mono text-violet-200">
                            {payment.razorpay_order_id}
                          </span>
                          <Clipboard
                            className="h-3 w-3 cursor-pointer hover:text-violet-300"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                payment.razorpay_order_id
                              )
                            }
                          />
                        </div>
                        {payment.razorpay_payment_id && (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-violet-300">
                              Payment ID:
                            </span>
                            <span className="text-sm font-mono text-violet-200">
                              {payment.razorpay_payment_id}
                            </span>
                            <Clipboard
                              className="h-3 w-3 cursor-pointer hover:text-violet-300"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  payment.razorpay_payment_id || ""
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-violet-200">
                      {formatDate(payment.createdAt)}
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
