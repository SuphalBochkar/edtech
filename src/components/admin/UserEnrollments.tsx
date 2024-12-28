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

// type APIEnrollment = {
//   id: string;
//   userId: string;
//   courses: Course[];
//   paymentProofUrl: string | null;
//   status: EnrollmentStatus;
//   totalAmount: number;
//   createdAt: Date;
//   updatedAt: Date;
//   user: {
//     name: string | null;
//     email: string;
//     image: string | null;
//   };
// };

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

      // Transform the API response to match our component's type
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

  const getStatusColor = (status: Enrollment["status"]) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return colors[status];
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>
              Manage and review course enrollment requests
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
                  onClick={() => {
                    if (sortField === "user")
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    setSortField("user");
                  }}
                >
                  User
                </TableHead>
                <TableHead>Courses</TableHead>
                <TableHead
                  onClick={() => {
                    if (sortField === "amount")
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    setSortField("amount");
                  }}
                >
                  Amount
                </TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead
                  onClick={() => {
                    if (sortField === "status")
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    setSortField("status");
                  }}
                >
                  Status
                </TableHead>
                <TableHead
                  onClick={() => {
                    if (sortField === "createdAt")
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    setSortField("createdAt");
                  }}
                >
                  Date
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={enrollment.user.image || ""} />
                        <AvatarFallback>
                          {enrollment.user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {enrollment.user.name || "Anonymous"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          {enrollment.user.email}
                          <Clipboard
                            className="h-4 w-4 cursor-pointer hover:text-gray-700"
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
                    <div className="space-y-1">
                      {enrollment.courses.map((course) => (
                        <div key={course} className="text-sm">
                          {CourseNames[course]}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>₹{enrollment.totalAmount}</TableCell>
                  <TableCell>
                    <a
                      href={enrollment.paymentProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        View Proof
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(enrollment.status)}>
                      {enrollment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(enrollment.createdAt)}</TableCell>
                  <TableCell>
                    {enrollment.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() =>
                            handleUpdateStatus(enrollment.id, "APPROVED")
                          }
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() =>
                            handleUpdateStatus(enrollment.id, "REJECTED")
                          }
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
