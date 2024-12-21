// // app/page.js
// "use client";
// import React, { useState } from "react";
// import { run } from "@/actions/test.actions";

// interface Account {
//   provider: string;
//   type: string;
//   providerAccountId: string;
// }

// interface UserWithMultipleAccounts {
//   userId: string;
//   userName: string | null;
//   email: string | null;
//   accountCount: number;
//   accounts: Account[];
//   accountDetails: string[];
// }

// interface CleanupResult {
//   success: boolean;
//   deletedAccounts: number;
//   deletedUsers: number;
//   expectedRemainingUsers: number;
//   expectedRemainingAccounts: number;
// }

// interface AnalysisResult {
//   summary: {
//     totalUsers: number;
//     totalAccounts: number;
//     usersWithNoAccounts: number;
//     usersWithMultipleAccounts: number;
//   };
//   accountDistribution: Record<number, number>;
//   providerStats: Record<string, number>;
//   detailedAnalysis: {
//     usersWithNoAccounts: UserWithMultipleAccounts[];
//     usersWithMultipleAccounts: UserWithMultipleAccounts[];
//   };
//   cleanup?: CleanupResult;
// }

// const Page = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState<string>("");
//   const [multipleAccounts, setMultipleAccounts] = useState<UserWithMultipleAccounts[]>([]);
//   const [shouldCleanup, setShouldCleanup] = useState(false);

//   const handleAnalysis = async () => {
//     try {
//       setIsLoading(true);
//       setMessage("Analysis started...");
//       const result = await run(shouldCleanup) as AnalysisResult;

//       if (shouldCleanup && result.cleanup) {
//         setMessage(`
//           Analysis and Cleanup completed!
//           Deleted ${result.cleanup.deletedAccounts} accounts
//           Deleted ${result.cleanup.deletedUsers} users
//           Remaining users: ${result.cleanup.expectedRemainingUsers}
//           Remaining accounts: ${result.cleanup.expectedRemainingAccounts}

//           Backup files have been created in data/backup/
//         `);
//       } else {
//         setMessage(`Analysis completed!`);
//       }
//       setMultipleAccounts(result.detailedAnalysis.usersWithMultipleAccounts);
//     } catch (err) {
//       setMessage(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">User-Account Analysis Tool</h1>

//       <div className="space-y-4">
//         <div className="mb-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={shouldCleanup}
//               onChange={(e) => setShouldCleanup(e.target.checked)}
//               className="form-checkbox"
//             />
//             <span className="text-sm text-gray-700">
//               Include cleanup (will delete duplicate accounts)
//             </span>
//           </label>
//         </div>

//         <button
//           onClick={handleAnalysis}
//           disabled={isLoading}
//           className={`px-4 py-2 rounded ${
//             isLoading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           {isLoading ? "Running Analysis..." : "Run Analysis"}
//         </button>

//         {message && (
//           <div
//             className={`mt-4 p-4 rounded ${
//               message.startsWith("Error")
//                 ? "bg-red-100 text-red-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {multipleAccounts.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-4">
//               Users with Multiple Accounts ({multipleAccounts.length})
//             </h2>
//             <div className="grid gap-4">
//               {multipleAccounts.map((user) => (
//                 <div
//                   key={user.userId}
//                   className="bg-white p-4 rounded-lg shadow border border-gray-200"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-lg">{user.userName}</h3>
//                       <p className="text-gray-600">{user.email}</p>
//                     </div>
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
//                       {user.accountCount} accounts
//                     </span>
//                   </div>

//                   <div className="mt-3">
//                     <h4 className="font-medium text-sm text-gray-700 mb-2">
//                       Google Accounts:
//                     </h4>
//                     <div className="space-y-2">
//                       {user.accounts.map((account, index) => (
//                         <div
//                           key={account.providerAccountId}
//                           className="bg-gray-50 p-2 rounded text-sm"
//                         >
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">
//                               Account {index + 1}
//                             </span>
//                             <span className="text-gray-500">
//                               ID: {account.providerAccountId}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

const Page = () => {
  return "Data Clean";
};

export default Page;
