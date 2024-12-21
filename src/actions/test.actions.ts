// "use server";
// import { prisma } from "@/lib/prisma";
// import fs from "fs/promises";
// import path from "path";

// interface UserAccountAnalysis {
//   userId: string;
//   userName: string | null;
//   email: string | null;
//   accountCount: number;
//   accounts: {
//     provider: string;
//     type: string;
//     providerAccountId: string;
//   }[];
// }

// async function analyzeUsersAndAccounts() {
//   try {
//     // Step 1: Get all users with their accounts
//     const usersWithAccounts = await prisma.user.findMany({
//       include: {
//         accounts: {
//           select: {
//             id: true,
//             provider: true,
//             type: true,
//             providerAccountId: true,
//           },
//         },
//       },
//     });

//     // Step 2: Analyze account distribution
//     const analysis: UserAccountAnalysis[] = usersWithAccounts.map((user) => ({
//       userId: user.id,
//       userName: user.name,
//       email: user.email,
//       accountCount: user.accounts.length,
//       accounts: user.accounts.map((acc) => ({
//         provider: acc.provider,
//         type: acc.type,
//         providerAccountId: acc.providerAccountId,
//       })),
//     }));

//     // Step 3: Create different analysis categories
//     const usersWithNoAccounts = analysis.filter((u) => u.accountCount === 0);
//     const usersWithMultipleAccounts = analysis.filter(
//       (u) => u.accountCount > 1
//     );
//     const accountDistribution = analysis.reduce(
//       (acc, curr) => {
//         acc[curr.accountCount] = (acc[curr.accountCount] || 0) + 1;
//         return acc;
//       },
//       {} as Record<number, number>
//     );

//     // Step 4: Get provider statistics
//     const providerStats = analysis.reduce(
//       (acc, user) => {
//         user.accounts.forEach((account) => {
//           acc[account.provider] = (acc[account.provider] || 0) + 1;
//         });
//         return acc;
//       },
//       {} as Record<string, number>
//     );

//     // Step 5: Find potential duplicates (same email different accounts)
//     const emailMap = new Map<string, UserAccountAnalysis[]>();
//     analysis.forEach((user) => {
//       if (user.email) {
//         if (!emailMap.has(user.email)) {
//           emailMap.set(user.email, []);
//         }
//         emailMap.get(user.email)?.push(user);
//       }
//     });

//     const potentialDuplicates = Array.from(emailMap.entries()).filter(
//       ([id, users]) => users.length > 1
//     );

//     // Create detailed report
//     const report = {
//       summary: {
//         totalUsers: usersWithAccounts.length,
//         totalAccounts: analysis.reduce(
//           (sum, user) => sum + user.accountCount,
//           0
//         ),
//         usersWithNoAccounts: usersWithNoAccounts.length,
//         usersWithMultipleAccounts: usersWithMultipleAccounts.length,
//       },
//       accountDistribution,
//       providerStats,
//       detailedAnalysis: {
//         usersWithNoAccounts,
//         usersWithMultipleAccounts: usersWithMultipleAccounts.map((u) => ({
//           ...u,
//           accountDetails: u.accounts.map((a) => `${a.provider} (${a.type})`),
//         })),
//         potentialDuplicateEmails: potentialDuplicates.map(([email, users]) => ({
//           email,
//           userCount: users.length,
//           users: users.map((u) => ({
//             userId: u.userId,
//             userName: u.userName,
//             accountCount: u.accountCount,
//             providers: u.accounts.map((a) => a.provider),
//           })),
//         })),
//       },
//     };

//     // Save report to file
//     const dataDir = path.join(process.cwd(), "data");
//     await fs.mkdir(dataDir, { recursive: true });
//     await fs.writeFile(
//       path.join(dataDir, "detailedAccountAnalysis.json"),
//       JSON.stringify(report, null, 2)
//     );

//     console.log("=== Account Analysis Summary ===");
//     console.log(`Total Users: ${report.summary.totalUsers}`);
//     console.log(`Total Accounts: ${report.summary.totalAccounts}`);
//     console.log(
//       `Users with no accounts: ${report.summary.usersWithNoAccounts}`
//     );
//     console.log(
//       `Users with multiple accounts: ${report.summary.usersWithMultipleAccounts}`
//     );
//     console.log("\nAccount Distribution:", accountDistribution);
//     console.log("\nProvider Statistics:", providerStats);
//     console.log("\nPotential Duplicate Emails:", potentialDuplicates.length);

//     return report;
//   } catch (error) {
//     console.error("Error in analysis:", error);
//     throw error;
//   }
// }

// async function backupDuplicateData() {
//   try {
//     console.log("Starting backup process...");

//     // Read the analysis file to get the list of users with multiple accounts
//     const analysisFile = await fs.readFile(
//       path.join(process.cwd(), "data", "detailedAccountAnalysis.json"),
//       "utf-8"
//     );
//     const analysis = JSON.parse(analysisFile);
//     const userIds = analysis.detailedAnalysis.usersWithMultipleAccounts.map(
//       (user: any) => user.userId
//     );

//     // Fetch complete user data
//     const users = await prisma.user.findMany({
//       where: {
//         id: {
//           in: userIds,
//         },
//       },
//     });

//     // Fetch complete account data
//     const accounts = await prisma.account.findMany({
//       where: {
//         userId: {
//           in: userIds,
//         },
//       },
//     });

//     // Transform data to MongoDB format
//     const formattedUsers = users.map((user) => ({
//       _id: {
//         $oid: user.id,
//       },
//       name: user.name,
//       email: user.email,
//       image: user.image,
//       paid: user.paid,
//       createdAt: {
//         $date: user.createdAt.toISOString(),
//       },
//       updatedAt: {
//         $date: user.updatedAt.toISOString(),
//       },
//       emailVerified: user.emailVerified
//         ? {
//             $date: user.emailVerified.toISOString(),
//           }
//         : null,
//     }));

//     const formattedAccounts = accounts.map((account) => ({
//       _id: {
//         $oid: account.id,
//       },
//       userId: {
//         $oid: account.userId,
//       },
//       type: account.type,
//       provider: account.provider,
//       providerAccountId: account.providerAccountId,
//       access_token: account.access_token,
//       expires_at: account.expires_at
//         ? {
//             $numberLong: account.expires_at.toString(),
//           }
//         : null,
//       token_type: account.token_type,
//       scope: account.scope,
//       id_token: account.id_token,
//       createdAt: {
//         $date: account.createdAt.toISOString(),
//       },
//       updatedAt: {
//         $date: account.updatedAt.toISOString(),
//       },
//     }));

//     // Create backup directory
//     const backupDir = path.join(process.cwd(), "data", "backup");
//     await fs.mkdir(backupDir, { recursive: true });

//     // Save backup files
//     await fs.writeFile(
//       path.join(backupDir, "dupUsers.json"),
//       JSON.stringify(formattedUsers, null, 2)
//     );

//     await fs.writeFile(
//       path.join(backupDir, "dupAccounts.json"),
//       JSON.stringify(formattedAccounts, null, 2)
//     );

//     return {
//       backedUpUsers: users.length,
//       backedUpAccounts: accounts.length,
//       backupLocation: backupDir,
//     };
//   } catch (error) {
//     console.error("Error in backup process:", error);
//     throw error;
//   }
// }

// async function cleanupDuplicateAccounts() {
//   try {
//     // First run backup
//     console.log("Creating backup...");
//     await backupDuplicateData();

//     // Read the analysis file
//     const analysisFile = await fs.readFile(
//       path.join(process.cwd(), "data", "detailedAccountAnalysis.json"),
//       "utf-8"
//     );
//     const analysis = JSON.parse(analysisFile);

//     // Get users with multiple accounts
//     const usersToDelete = analysis.detailedAnalysis.usersWithMultipleAccounts;
//     let deletedAccountsCount = 0;
//     let deletedUsersCount = 0;

//     // Process in batches of 5 users
//     const batchSize = 5;
//     for (let i = 0; i < usersToDelete.length; i += batchSize) {
//       const userBatch = usersToDelete.slice(i, i + batchSize);

//       // Process each batch in a separate transaction
//       const batchResult = await prisma.$transaction(
//         async (tx) => {
//           const batchResults = await Promise.all(
//             userBatch.map(async (user) => {
//               // Delete all accounts for this user
//               const deletedAccounts = await tx.account.deleteMany({
//                 where: {
//                   userId: user.userId,
//                 }
//               });

//               // Delete the user
//               await tx.user.delete({
//                 where: {
//                   id: user.userId,
//                 }
//               });

//               return {
//                 accountsDeleted: deletedAccounts.count,
//                 userDeleted: 1
//               };
//             })
//           );

//           return batchResults.reduce(
//             (acc, curr) => ({
//               accountsDeleted: acc.accountsDeleted + curr.accountsDeleted,
//               userDeleted: acc.userDeleted + curr.userDeleted
//             }),
//             { accountsDeleted: 0, userDeleted: 0 }
//           );
//         },
//         {
//           timeout: 10000 // 10 second timeout for each batch
//         }
//       );

//       deletedAccountsCount += batchResult.accountsDeleted;
//       deletedUsersCount += batchResult.userDeleted;

//       console.log(`Processed batch ${i/batchSize + 1}/${Math.ceil(usersToDelete.length/batchSize)}`);
//       console.log(`Deleted ${batchResult.accountsDeleted} accounts and ${batchResult.userDeleted} users in this batch`);

//       // Add a small delay between batches
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     console.log("Cleanup completed successfully");
//     console.log(`Total deleted accounts: ${deletedAccountsCount}`);
//     console.log(`Total deleted users: ${deletedUsersCount}`);

//     return {
//       success: true,
//       deletedAccounts: deletedAccountsCount,
//       deletedUsers: deletedUsersCount,
//       expectedRemainingUsers: 4400 - deletedUsersCount,
//       expectedRemainingAccounts: 4415 - deletedAccountsCount,
//     };
//   } catch (error) {
//     console.error("Error in cleanup process:", error);
//     throw error;
//   }
// }

// export async function run(shouldCleanup: boolean = false) {
//   try {
//     console.log("Starting detailed account analysis...");
//     const report = await analyzeUsersAndAccounts();

//     if (shouldCleanup) {
//       console.log("Starting cleanup process...");
//       const cleanupResult = await cleanupDuplicateAccounts();
//       return { ...report, cleanup: cleanupResult };
//     }

//     return report;
//   } catch (e) {
//     console.error("Error in main function:", e);
//     throw error;
//   }
// }

export async function run() {
  console.log("hii");
}
