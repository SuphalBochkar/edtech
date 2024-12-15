// "use client";

// import { useState, useEffect } from "react";

// type User = {
//   id: string;
//   name: string;
// };

// type Query = {
//   id: string;
//   question: string;
//   status: "open" | "in-progress" | "resolved";
// };

// export default function AdminDashboard() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<string | null>(null);
//   const [userQueries, setUserQueries] = useState<Query[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/query/admin/users");
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const data: { users: User[] } = await response.json();
//       setUsers(data.users);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserQueries = async (userId: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/admin/queries?userId=${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch queries");
//       }
//       const data: { queries: Query[] } = await response.json();
//       setUserQueries(data.queries);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQueryStatus = async (
//     queryId: string,
//     status: Query["status"]
//   ) => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/admin/queries/update", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ queryId, status }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update query");
//       }
//       if (selectedUser) {
//         fetchUserQueries(selectedUser);
//       }
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Users</h2>
//           <ul className="border rounded-md divide-y">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className={`p-2 cursor-pointer ${
//                   selectedUser === user.id ? "bg-gray-200" : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedUser(user.id);
//                   fetchUserQueries(user.id);
//                 }}
//               >
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="col-span-2">
//           <h2 className="text-xl font-semibold mb-2">User Queries</h2>
//           {selectedUser ? (
//             <ul className="border rounded-md divide-y">
//               {userQueries.map((query) => (
//                 <li
//                   key={query.id}
//                   className="p-2 flex justify-between items-center"
//                 >
//                   <div>
//                     <p className="font-semibold">{query.question}</p>
//                     <p className="text-sm text-gray-500">
//                       Status: {query.status}
//                     </p>
//                   </div>
//                   <select
//                     className="border p-1 rounded"
//                     value={query.status}
//                     onChange={(e) =>
//                       updateQueryStatus(
//                         query.id,
//                         e.target.value as Query["status"]
//                       )
//                     }
//                   >
//                     <option value="open">Open</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="resolved">Resolved</option>
//                   </select>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Select a user to view their queries</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
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

type Query = {
  id: string;
  user?: { name: string };
  message: string;
  status: string;
  createdAt: string; // Changed to string for easier sorting
};

type SortField = "status" | "createdAt";

export default function AdminQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchQueries = async () => {
    try {
      const response = await fetch("/api/admin/queries");
      const data = await response.json();
      if (response.ok) {
        setQueries(
          data.queries.map((q: Query) => ({
            ...q,
            createdAt: new Date(q.createdAt).toISOString(), // Ensure consistent date format
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update query");
      }

      fetchQueries();
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const sortedQueries = [...queries].sort((a, b) => {
    if (sortField === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else {
      return sortOrder === "asc"
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt);
    }
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <p className="text-center p-4">Loading queries...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Queries</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Message</TableHead>
            <TableHead
              onClick={() => toggleSort("status")}
              className="cursor-pointer"
            >
              Status{" "}
              {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => toggleSort("createdAt")}
              className="cursor-pointer"
            >
              Date Created{" "}
              {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQueries.map((query) => (
            <TableRow key={query.id}>
              <TableCell>{query.user?.name || "Anonymous"}</TableCell>
              <TableCell>{query.message}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    query.status === "PENDING"
                      ? "bg-yellow-200 text-yellow-800"
                      : query.status === "RESOLVED"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                  }`}
                >
                  {query.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(query.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Select
                    value={query.status}
                    onValueChange={(value) => updateStatus(query.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent className="bg-foreground text-background">
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="ERROR">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
