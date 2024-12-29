"use client";

import { useEffect, useState } from "react";
import {
  Filter,
  RefreshCw,
  AlertCircle,
  Clipboard,
  Check,
  X,
  Image as ImageIcon,
  GraduationCap,
  Search,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shad/avatar";
import {
  getEnrollments,
  updateEnrollmentStatus,
} from "@/actions/admin.actions";
import { Course, CourseNames } from "@/lib/data";
import EnrollmentsSkeleton from "./EnrollmentsSkeleton";

type EnrollmentStatus = "PENDING" | "APPROVED" | "REJECTED";

type Enrollment = {
  id: string;
  userId: string;
  courses: Course[];
  paymentProofUrl: string;
  status: EnrollmentStatus;
  totalAmount: number;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
};

type SortField = "status" | "createdAt" | "user" | "amount";
type FilterStatus = "ALL" | EnrollmentStatus;

const getStatusColor = (status: EnrollmentStatus) => {
  const colors = {
    PENDING: "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20",
    APPROVED: "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
    REJECTED: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
  };
  return colors[status];
};

export default function UserEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  const fetchEnrollments = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await getEnrollments();
      if (!result.success || !result.enrollments) {
        throw new Error(result.message || "Failed to fetch enrollments");
      }

      const transformedEnrollments: Enrollment[] = result.enrollments.map(
        (enrollment) => ({
          ...enrollment,
          paymentProofUrl: enrollment.paymentProofUrl || "",
          createdAt: enrollment.createdAt.toISOString(),
          courses: enrollment.courses as Course[],
        })
      );

      setEnrollments(transformedEnrollments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshEnrollments = async () => {
    setRefreshing(true);
    await fetchEnrollments();
    setRefreshing(false);
  };

  const handleUpdateStatus = async (
    enrollmentId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      const result = await updateEnrollmentStatus(enrollmentId, status);
      if (!result.success) {
        throw new Error(result.message);
      }
      await refreshEnrollments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return <EnrollmentsSkeleton />;
  }

  const filteredAndSortedEnrollments = enrollments
    .filter((enrollment) => {
      const matchesSearch =
        enrollment.user.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        enrollment.user.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || enrollment.status === statusFilter;
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
        case "amount":
          return modifier * (a.totalAmount - b.totalAmount);
        case "createdAt":
          return modifier * a.createdAt.localeCompare(b.createdAt);
        default:
          return 0;
      }
    });

  return (
    <Card className="border-violet-500/20 bg-black/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-violet-400" />
              Course Enrollments
            </CardTitle>
            <CardDescription className="text-violet-300">
              Manage and review course enrollment requests
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />
              <Input
                placeholder="Search by name or email..."
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
                  Show All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>
                  Pending Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("APPROVED")}>
                  Approved Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("REJECTED")}>
                  Rejected Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              onClick={refreshEnrollments}
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
                <TableHead className="text-violet-300">Courses</TableHead>
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
                  Amount{" "}
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
              {filteredAndSortedEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-violet-300"
                  >
                    No enrollments found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedEnrollments.map((enrollment) => (
                  <TableRow
                    key={enrollment.id}
                    className="border-violet-500/20 hover:bg-violet-500/5"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={enrollment.user.image || ""} />
                          <AvatarFallback className="bg-violet-500/20 text-violet-200">
                            {enrollment.user.name?.[0] || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-violet-200">
                            {enrollment.user.name || "Anonymous"}
                          </div>
                          <div className="text-sm text-violet-400 flex items-center gap-1">
                            {enrollment.user.email}
                            <Clipboard
                              className="h-3 w-3 cursor-pointer hover:text-violet-300"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  enrollment.user.email
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {enrollment.courses.map((course) => (
                          <Badge
                            key={course}
                            className="bg-violet-500/10 text-violet-300"
                          >
                            {CourseNames[course]}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-violet-200">
                      ₹{enrollment.totalAmount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(enrollment.status)}>
                        {enrollment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-violet-200">
                      {formatDate(enrollment.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {enrollment.status === "PENDING" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleUpdateStatus(enrollment.id, "APPROVED")
                              }
                              className="hover:bg-emerald-500/10 hover:text-emerald-300"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleUpdateStatus(enrollment.id, "REJECTED")
                              }
                              className="hover:bg-red-500/10 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {enrollment.paymentProofUrl && (
                          <a
                            href={enrollment.paymentProofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-violet-500/10 hover:text-violet-300"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                      </div>
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
