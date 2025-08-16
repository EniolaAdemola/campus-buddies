import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Plus, Eye, Edit, UserPlus } from "lucide-react";

// Mock student data
const mockStudents = [
  {
    id: "SBF-0015",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    course: "Computer Science",
    interests: ["React", "Machine Learning", "Data Structures"],
    status: "available",
    avatar: "",
    year: "Junior",
    lastActive: "2 hours ago"
  },
  {
    id: "SBF-0028",
    name: "Marcus Chen",
    email: "marcus.chen@university.edu", 
    course: "Data Science",
    interests: ["Python", "Statistics", "AI"],
    status: "busy",
    avatar: "",
    year: "Senior",
    lastActive: "1 day ago"
  },
  {
    id: "SBF-0042",
    name: "Sarah Williams",
    email: "sarah.w@university.edu",
    course: "Mathematics",
    interests: ["Calculus", "Linear Algebra", "Statistics"],
    status: "offline",
    avatar: "",
    year: "Sophomore", 
    lastActive: "3 days ago"
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "available":
        return "status-available";
      case "busy":
        return "status-busy";
      default:
        return "status-offline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "busy":
        return "Busy";
      default:
        return "Offline";
    }
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.interests.some(interest => 
                           interest.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCourse = !courseFilter || student.course === courseFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Buddy Dashboard</h1>
            <p className="text-muted-foreground">Find and connect with study partners</p>
          </div>
          <Button variant="hero" className="mt-4 lg:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, course, or interest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Courses</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students Table/Cards */}
        <div className="bg-card rounded-lg border border-border shadow-study">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || courseFilter || statusFilter 
                  ? "Try adjusting your filters to see more results."
                  : "No students yet. Add your first student."
                }
              </p>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Student</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Course</th>
                    <th className="p-4 font-medium">Interests</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{student.email}</td>
                      <td className="p-4">{student.course}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {student.interests.slice(0, 2).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {student.interests.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{student.interests.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusStyle(student.status)}>
                          {getStatusText(student.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;