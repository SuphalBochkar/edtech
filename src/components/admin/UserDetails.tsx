"use client";

import { useState } from "react";
import {
  Search,
  User,
  MessageSquare,
  Calendar,
  Book,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { Course, CourseNames } from "@/lib/data";
import { getUserDetails } from "@/actions/admin.actions";

type Payment = {
  id: string;
  course: string;
  status: string;
  razorpay_payment_id?: string | null;
  createdAt: string | null;
};

type Query = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  image: string;
  name: string;
  email: string;
  createdAt: string;
  courses: Course[];
  payments: Payment[];
  queries: Query[];
};

export default function UserDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const result = await getUserDetails(searchTerm);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.user) {
        setUser(result.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={fetchUserDetails}
          disabled={loading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <>
              <Loader className="inline-block mr-2 h-5 w-5 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {user && (
        <div className="space-y-10">
          <UserInfo user={user} />
          <EnrolledCourses courses={user.courses} />
          <PaymentHistory payments={user.payments} />
          <UserQueries queries={user.queries} />
        </div>
      )}
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">User Information</h2>
        <div className="flex items-center space-x-6 mb-6">
          <Image
            src={user.image}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover"
            width={96}
            height={96}
          />
          <div>
            <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-3 md:col-span-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="font-medium">Account Created:</span>
            <span>{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrolledCourses({ courses }: { courses: Course[] }) {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Enrolled Courses</h2>
        {courses.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200"
              >
                <Book className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{CourseNames[course]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No courses enrolled.</p>
        )}
      </div>
    </div>
  );
}

function PaymentHistory({ payments }: { payments: Payment[] }) {
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Payment ID</th>
                <th className="p-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-200">
                  <td className="p-2">
                    {CourseNames[payment.course as Course]}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-2 font-mono text-xs">
                    {payment.razorpay_payment_id || "N/A"}
                  </td>
                  <td className="p-2">{formatDate(payment.createdAt || "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payment records available.</p>
      )}
    </div>
  );
}

function UserQueries({ queries }: { queries: Query[] }) {
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Queries</h2>
      {queries.length > 0 ? (
        <div className="space-y-4">
          {queries.map((query) => (
            <div
              key={query.id}
              className="p-4 rounded-md border border-gray-200"
            >
              <p className="mb-2">{query.message}</p>
              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(query.status)}`}
                >
                  {query.status}
                </span>
                <span>{formatDate(query.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No queries available.</p>
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status: string) {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    RESOLVED: "bg-green-100 text-green-800",
    ERROR: "bg-red-100 text-red-800",
    SUCCESS: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
}
