"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shad/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shad/table";
import { RefreshCw, AlertCircle, User, Trash2, Users } from "lucide-react";
import { Button } from "@/ui/shad/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shad/avatar";
import { getActiveSessions, deleteUserSession } from "@/actions/admin.actions";
import SessionsSkeleton from "./SessionsSkeleton";

type Session = {
  id: string;
  sessionToken: string;
  expires: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export default function UserSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSessions = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await getActiveSessions();
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.sessions) {
        setSessions(result.sessions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshSessions = async () => {
    setRefreshing(true);
    await fetchSessions();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (expiryDate: string) => {
    const remaining = new Date(expiryDate).getTime() - new Date().getTime();
    const minutes = Math.floor(remaining / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const result = await deleteUserSession(sessionId);
      if (result.success) {
        fetchSessions();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  if (loading) {
    return <SessionsSkeleton />;
  }

  return (
    <Card className="border-violet-500/20 bg-black/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
              <Users className="h-6 w-6 text-violet-400" />
              Active Sessions
            </CardTitle>
            <CardDescription className="text-violet-300">
              Currently active user sessions
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={refreshSessions}
            disabled={refreshing}
            className="bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/30"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
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
                <TableHead className="text-violet-300">User</TableHead>
                <TableHead className="text-violet-300">
                  Session Started
                </TableHead>
                <TableHead className="text-violet-300">Expires In</TableHead>
                <TableHead className="text-violet-300">Last Updated</TableHead>
                <TableHead className="text-violet-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-violet-300"
                  >
                    No active sessions found.
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="border-violet-500/20 hover:bg-violet-500/5"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={session.user.image || ""} />
                          <AvatarFallback className="bg-violet-500/20 text-violet-200">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-violet-200">
                            {session.user.name || "Anonymous"}
                          </div>
                          <div className="text-sm text-violet-400">
                            {session.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-violet-200">
                      {formatDate(session.createdAt)}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-violet-500/10 text-violet-300">
                        {getTimeRemaining(session.expires)}
                      </span>
                    </TableCell>
                    <TableCell className="text-violet-200">
                      {formatDate(session.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSession(session.id)}
                        className="hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
