"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Clipboard,
  IndianRupee,
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
    PENDING: "bg-yellow-100 text-yellow-800",
    SUCCESS: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

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
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View and manage payment records</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
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
              <DropdownMenuContent className="bg-white text-background">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortField("user");
                    setSortOrder(
                      sortField === "user" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  User{" "}
                  {sortField === "user" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortField("course");
                    setSortOrder(
                      sortField === "course" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Course{" "}
                  {sortField === "course" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortField("amount");
                    setSortOrder(
                      sortField === "amount" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Cost{" "}
                  {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortField("status");
                    setSortOrder(
                      sortField === "status" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Payment Details</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortField("createdAt");
                    setSortOrder(
                      sortField === "createdAt" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Date{" "}
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {payment.user.name || "Anonymous"}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        {payment.user.email}
                        <Clipboard
                          className="h-4 w-4 cursor-pointer hover:text-gray-700"
                          onClick={() =>
                            handleCopyToClipboard(payment.user.email)
                          }
                        />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{CourseNames[payment.course as Course]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
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
                        <span className="text-sm font-medium">Order ID:</span>
                        <span className="text-sm font-mono">
                          {payment.razorpay_order_id}
                        </span>
                        <Clipboard
                          className="h-3 w-3 cursor-pointer hover:text-gray-700"
                          onClick={() =>
                            handleCopyToClipboard(payment.razorpay_order_id)
                          }
                        />
                      </div>
                      {payment.razorpay_payment_id && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">
                            Payment ID:
                          </span>
                          <span className="text-sm font-mono">
                            {payment.razorpay_payment_id}
                          </span>
                          <Clipboard
                            className="h-3 w-3 cursor-pointer hover:text-gray-700"
                            onClick={() =>
                              handleCopyToClipboard(
                                payment?.razorpay_payment_id || ""
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(payment.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
