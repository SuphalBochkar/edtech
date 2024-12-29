"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  MessageSquare,
  Calendar,
  Book,
  Loader,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import Image from "next/image";
import { Course, CourseNames } from "@/lib/data";
import { getUserDetails, searchUsers } from "@/actions/admin.actions";
import DetailsSkeleton from "./DetailsSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

type Payment = {
  id: string;
  course: string;
  status: string;
  razorpay_payment_id?: string | null;
  createdAt: string | null;
  amount: number;
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

type SearchUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

const getStatusColor = (status: string) => {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-600",
    SUCCESS: "bg-emerald-500/10 text-emerald-300",
    FAILED: "bg-red-500/10 text-red-300",
    RESOLVED: "bg-emerald-500/10 text-emerald-300",
    ERROR: "bg-red-500/10 text-red-300",
  } as const;

  return (
    colors[status as keyof typeof colors] || "bg-violet-500/10 text-violet-300"
  );
};

export default function UserDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchForUsers = async () => {
      if (debouncedSearch.length < 2) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        const result = await searchUsers(debouncedSearch);
        if (result.error) {
          console.error(result.error);
          return;
        }
        if (result.users) {
          setSearchResults(result.users);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Error searching users:", err);
      } finally {
        setSearchLoading(false);
      }
    };

    searchForUsers();
  }, [debouncedSearch]);

  const fetchUserDetails = async (userId: string) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setShowDropdown(false);
    try {
      const result = await getUserDetails(userId);
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

  if (loading) {
    return <DetailsSkeleton />;
  }

  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            type="text"
            placeholder="Search by email or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-violet-500/10 border border-violet-500/20 focus:border-violet-500/40 text-violet-100 placeholder-violet-400/50 outline-none transition-colors"
          />
          {searchLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader className="h-5 w-5 animate-spin text-violet-400" />
            </div>
          )}

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-2 rounded-xl border border-violet-500/20 bg-black/90 backdrop-blur-xl shadow-lg overflow-hidden">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => fetchUserDetails(result.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-violet-500/10 transition-colors border-b border-violet-500/10 last:border-0"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-violet-500/10">
                    {result.image ? (
                      <Image
                        src={result.image}
                        alt={result.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-5 w-5 text-violet-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow text-left">
                    <div className="font-medium text-violet-200">
                      {result.name || "Anonymous"}
                    </div>
                    <div className="text-sm text-violet-400">
                      {result.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 backdrop-blur-sm text-red-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {user && (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* User Info Card */}
          <div className="rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
            <div className="p-6 space-y-6">
              {/* User Header */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-50 blur group-hover:opacity-75 transition duration-300" />
                  <div className="relative">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover border-2 border-violet-500/20 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                    {user.name}
                  </h3>
                  <p className="text-violet-300/80">{user.email}</p>
                </div>
              </div>

              {/* User Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-violet-400" />
                  <span className="font-medium text-violet-200">Name:</span>
                  <span className="text-violet-300">{user.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-violet-400" />
                  <span className="font-medium text-violet-200">Email:</span>
                  <span className="text-violet-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <Calendar className="h-5 w-5 text-violet-400" />
                  <span className="font-medium text-violet-200">
                    Account Created:
                  </span>
                  <span className="text-violet-300">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Book className="h-5 w-5 text-violet-400" />
                Enrolled Courses
              </h2>
              {user.courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.courses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl border border-violet-500/20 bg-violet-500/10 backdrop-blur-sm"
                    >
                      <Book className="h-5 w-5 text-violet-400" />
                      <span className="text-violet-200 font-medium">
                        {CourseNames[course]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-violet-300/70">No courses enrolled.</p>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-violet-400" />
                Payment History
              </h2>
              {user.payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-violet-500/20">
                        <th className="text-left p-3 text-violet-300">
                          Course
                        </th>
                        <th className="text-left p-3 text-violet-300">
                          Status
                        </th>
                        <th className="text-left p-3 text-violet-300">
                          Amount
                        </th>
                        <th className="text-left p-3 text-violet-300">
                          Payment ID
                        </th>
                        <th className="text-left p-3 text-violet-300">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-500/20">
                      {user.payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="group hover:bg-violet-500/5 transition-colors"
                        >
                          <td className="p-3 text-violet-200">
                            {CourseNames[payment.course as Course]}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="p-3 text-violet-200">
                            ₹{payment.amount.toLocaleString("en-IN")}
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-xs text-violet-300">
                              {payment.razorpay_payment_id || "N/A"}
                            </span>
                          </td>
                          <td className="p-3 text-violet-200">
                            {formatDate(payment.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-violet-300/70">
                  No payment records available.
                </p>
              )}
            </div>
          </div>

          {/* User Queries */}
          <div className="rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-400" />
                User Queries
              </h2>
              {user.queries.length > 0 ? (
                <div className="space-y-4">
                  {user.queries.map((query) => (
                    <div
                      key={query.id}
                      className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/10 backdrop-blur-sm"
                    >
                      <p className="mb-3 text-violet-200">{query.message}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(query.status)}`}
                        >
                          {query.status}
                        </span>
                        <span className="text-violet-300/70">
                          {formatDate(query.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-violet-300/70">No queries available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
