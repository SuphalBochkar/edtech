// // "use client";

// // import { useState } from "react";
// // import { Input } from "@/ui/shad/input";
// // import { Button } from "@/ui/shad/button";
// // import {
// //   Card,
// //   CardHeader,
// //   CardContent,
// //   CardTitle,
// //   CardDescription,
// // } from "@/ui/shad/card";
// // import DetailsSkeleton from "./DetailsSkeleton";

// // type Payment = {
// //   id: string;
// //   course: string;
// //   status: string;
// //   razorpay_payment_id?: string | null;
// // };

// // type Query = {
// //   id: string;
// //   message: string;
// //   status: string;
// //   createdAt: string;
// //   updatedAt: string;
// // };

// // type User = {
// //   name: string;
// //   email: string;
// //   createdAt: string;
// //   courses: string[];
// //   payments: Payment[];
// //   queries: Query[];
// // };

// // export default function UserDetails() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const fetchUserDetails = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setUser(null);
// //     try {
// //       const response = await fetch("/api/admin/details", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ search: searchTerm }),
// //       });

// //       const data = await response.json();
// //       if (!response.ok) {
// //         throw new Error(data.error || "Failed to fetch user details");
// //       }
// //       console.log("Data: ", data);
// //       setUser(data.user);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "An error occurred");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card className="w-full max-w-4xl mx-auto mt-6 p-4">
// //       <CardHeader>
// //         <CardTitle>Search User Details</CardTitle>
// //         <CardDescription>
// //           Enter the user{"'"}s email or name to retrieve their details.
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="flex gap-2 mb-4">
// //           <Input
// //             placeholder="Search by email or name"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full"
// //           />
// //           <Button onClick={fetchUserDetails} disabled={loading}>
// //             {loading ? "Loading..." : "Search"}
// //           </Button>
// //         </div>

// //         {loading && <DetailsSkeleton />}
// //         {error && <p className="text-red-500">{error}</p>}

// //         {user && (
// //           <div className="space-y-4">
// //             {/* User Basic Details */}
// //             <div className="border-b pb-2">
// //               <h3 className="text-lg font-semibold mb-2">User Details</h3>
// //               <p>
// //                 <strong>Name:</strong> {user.name}
// //               </p>
// //               <p>
// //                 <strong>Email:</strong> {user.email}
// //               </p>
// //               <p>
// //                 <strong>Account Created:</strong>{" "}
// //                 {new Date(user.createdAt).toLocaleString()}
// //               </p>
// //             </div>

// //             {/* Courses Section */}
// //             <div>
// //               <h3 className="text-lg font-semibold mb-2">Enrolled Courses</h3>
// //               <ul className="list-disc pl-5">
// //                 {user.courses.length > 0 ? (
// //                   user.courses.map((course, index) => (
// //                     <li key={index} className="text-gray-700">
// //                       {course}
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <p>No courses enrolled.</p>
// //                 )}
// //               </ul>
// //             </div>

// //             {/* Payments Section */}
// //             <div>
// //               <h3 className="text-lg font-semibold mb-2">Payment History</h3>
// //               <ul className="space-y-2">
// //                 {user.payments.length > 0 ? (
// //                   user.payments.map((payment) => (
// //                     <li key={payment.id} className="border-b py-2">
// //                       <p>
// //                         Course:{" "}
// //                         <span className="font-medium">{payment.course}</span>
// //                       </p>
// //                       <p>
// //                         Status:{" "}
// //                         <span className="font-medium">{payment.status}</span>
// //                       </p>
// //                       {payment.razorpay_payment_id && (
// //                         <p>
// //                           Payment ID:{" "}
// //                           <span className="text-gray-600">
// //                             {payment.razorpay_payment_id}
// //                           </span>
// //                         </p>
// //                       )}
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <p>No payment records available.</p>
// //                 )}
// //               </ul>
// //             </div>

// //             {/* Queries Section */}
// //             <div>
// //               <h3 className="text-lg font-semibold mb-2">User Queries</h3>
// //               <ul className="space-y-2">
// //                 {user.queries.length > 0 ? (
// //                   user.queries.map((query) => (
// //                     <li key={query.id} className="border-b py-2">
// //                       <p>
// //                         Message:{" "}
// //                         <span className="text-gray-700">{query.message}</span>
// //                       </p>
// //                       <p>
// //                         Status:{" "}
// //                         <span
// //                           className={`font-medium ${
// //                             query.status === "RESOLVED"
// //                               ? "text-green-600"
// //                               : "text-yellow-600"
// //                           }`}
// //                         >
// //                           {query.status}
// //                         </span>
// //                       </p>
// //                       <p className="text-gray-500 text-sm">
// //                         Created At: {new Date(query.createdAt).toLocaleString()}
// //                       </p>
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <p>No queries available.</p>
// //                 )}
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import {
//   Search,
//   User,
//   MessageSquare,
//   Loader2,
//   Calendar,
//   Book,
// } from "lucide-react";
// import { Input } from "@/ui/shad/input";
// import { Button } from "@/ui/shad/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/ui/shad/card";
// import { Badge } from "@/ui/shad/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/ui/shad/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shad/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shad/avatar";
// import { ScrollArea } from "@/ui/shad/scroll-area";

// type Payment = {
//   id: string;
//   course: string;
//   status: string;
//   razorpay_payment_id?: string | null;
// };

// type Query = {
//   id: string;
//   message: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type User = {
//   image: string;
//   name: string;
//   email: string;
//   createdAt: string;
//   courses: string[];
//   payments: Payment[];
//   queries: Query[];
// };

// export default function UserDetails() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUserDetails = async () => {
//     setLoading(true);
//     setError(null);
//     setUser(null);
//     try {
//       const response = await fetch("/api/admin/details", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ search: searchTerm }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Failed to fetch user details");
//       }
//       setUser(data.user);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusColor = (status: string) => {
//     const colors = {
//       PENDING: "bg-yellow-100 text-yellow-800",
//       RESOLVED: "bg-green-100 text-green-800",
//       ERROR: "bg-red-100 text-red-800",
//       SUCCESS: "bg-green-100 text-green-800",
//       FAILED: "bg-red-100 text-red-800",
//     };
//     return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-6 shadow-lg">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold">User Details</CardTitle>
//         <CardDescription>Search and view user information</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center space-x-2 mb-6">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by email or name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 rounded-full"
//             />
//           </div>
//           <Button
//             onClick={fetchUserDetails}
//             disabled={loading}
//             className="rounded-full"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Searching...
//               </>
//             ) : (
//               "Search"
//             )}
//           </Button>
//         </div>

//         {error && (
//           <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
//             {error}
//           </div>
//         )}

//         {user && (
//           <Tabs defaultValue="details" className="w-full">
//             <TabsList className="grid w-full grid-cols-4 mb-4">
//               <TabsTrigger value="details" className="rounded-full">
//                 Details
//               </TabsTrigger>
//               <TabsTrigger value="courses" className="rounded-full">
//                 Courses
//               </TabsTrigger>
//               <TabsTrigger value="payments" className="rounded-full">
//                 Payments
//               </TabsTrigger>
//               <TabsTrigger value="queries" className="rounded-full">
//                 Queries
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="details">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>User Information</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4 mb-4">
//                     <Avatar className="h-20 w-20">
//                       <AvatarImage src={user.image} alt={user.name} />
//                       <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="text-lg font-semibold">{user.name}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <User className="h-4 w-4 text-muted-foreground" />
//                       <span className="font-medium">Name:</span> {user.name}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <MessageSquare className="h-4 w-4 text-muted-foreground" />
//                       <span className="font-medium">Email:</span> {user.email}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="h-4 w-4 text-muted-foreground" />
//                       <span className="font-medium">Account Created:</span>{" "}
//                       {formatDate(user.createdAt)}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="courses">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Enrolled Courses</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {user.courses.length > 0 ? (
//                     <ul className="grid grid-cols-2 gap-2">
//                       {user.courses.map((course, index) => (
//                         <li
//                           key={index}
//                           className="flex items-center space-x-2 p-2 rounded-md border"
//                         >
//                           <Book className="h-4 w-4 text-muted-foreground" />
//                           <span>{course}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-muted-foreground">
//                       No courses enrolled.
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="payments">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Payment History</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {user.payments.length > 0 ? (
//                     <ScrollArea className="h-[300px] rounded-md border">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead className="w-[100px]">Course</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Payment ID</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {user.payments.map((payment) => (
//                             <TableRow key={payment.id}>
//                               <TableCell className="font-medium">
//                                 {payment.course}
//                               </TableCell>
//                               <TableCell>
//                                 <Badge
//                                   className={getStatusColor(payment.status)}
//                                 >
//                                   {payment.status}
//                                 </Badge>
//                               </TableCell>
//                               <TableCell className="font-mono text-xs">
//                                 {payment.razorpay_payment_id || "N/A"}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </ScrollArea>
//                   ) : (
//                     <p className="text-muted-foreground">
//                       No payment records available.
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="queries">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>User Queries</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {user.queries.length > 0 ? (
//                     <ScrollArea className="h-[300px] rounded-md border">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Message</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Created At</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {user.queries.map((query) => (
//                             <TableRow key={query.id}>
//                               <TableCell className="max-w-[300px]">
//                                 <div className="truncate">{query.message}</div>
//                               </TableCell>
//                               <TableCell>
//                                 <Badge className={getStatusColor(query.status)}>
//                                   {query.status}
//                                 </Badge>
//                               </TableCell>
//                               <TableCell>
//                                 {formatDate(query.createdAt)}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </ScrollArea>
//                   ) : (
//                     <p className="text-muted-foreground">
//                       No queries available.
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

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
      const response = await fetch("/api/admin/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: searchTerm }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user details");
      }
      setUser(data.user);
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
