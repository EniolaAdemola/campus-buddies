import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, Plus, Eye, Edit, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email?: string | null;
  course: string | null;
  interests: string[] | null;
  status: string | null;
  avatar: string | null;
  year: string | null;
  last_active: string | null;
  group_number: number | null;
  description: string | null;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all-courses");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: "",
    course: "",
    year: "",
    description: "",
    interests: "",
    status: "available",
    group_number: ""
  });
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { toast } = useToast();

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

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          // Check localStorage for user role first
          const storedRole = localStorage.getItem('userRole');
          if (storedRole) {
            setUserRole(storedRole as any);
          } else {
            // Fallback to RPC if not in localStorage
            supabase.rpc('get_current_user_role').then(({ data, error }) => {
              if (!error && data) {
                setUserRole(data as any);
                localStorage.setItem('userRole', data as string);
              }
            });
          }
        } else {
          setCurrentUser(null);
          setUserRole(null);
          localStorage.removeItem('userRole');
        }
      }
    );

    const loadData = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          
          // Check localStorage first, then RPC
          const storedRole = localStorage.getItem('userRole');
          if (storedRole) {
            setUserRole(storedRole as any);
          } else {
            const { data, error: roleErr } = await supabase.rpc('get_current_user_role');
            if (!roleErr && data) {
              setUserRole(data as any);
              localStorage.setItem('userRole', data as string);
            }
          }
        }
        
        // Load profiles
        await loadProfiles();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    
    loadData();

    return () => subscription.unsubscribe();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        
        // Get user role
        const { data, error } = await supabase.rpc('get_current_user_role');
        if (error) {
          console.error('Error fetching role via RPC:', error);
        }
        setUserRole((data as any) || null);
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const loadProfiles = async () => {
    try {
      setLoading(true);
      
      // Load all profiles directly (emails are stored on profiles)
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProfiles(profilesData || []);
      // Extract unique courses for filter
      const courses = [
        ...new Set((profilesData || []).map((p) => p.course).filter(Boolean)),
      ];
      setAvailableCourses(courses);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowDetailModal(true);
  };

  const handleEditProfile = (profile: Profile) => {
    // Only admins can edit other profiles, users can only edit their own
    if (userRole !== 'admin' && profile.user_id !== currentUser?.id) {
      toast({
        title: "Access Denied",
        description: "You can only edit your own profile",
        variant: "destructive",
      });
      return;
    }
    
    // Set up edit form with current profile data
    setEditingProfile(profile);
    setEditForm({
      full_name: profile.full_name || "",
      course: profile.course || "",
      year: profile.year || "",
      description: profile.description || "",
      interests: (profile.interests || []).join(", "),
      status: profile.status || "available",
      group_number: profile.group_number?.toString() || ""
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editForm.full_name || null,
          course: editForm.course || null,
          year: editForm.year || null,
          description: editForm.description || null,
          interests: editForm.interests
            ? editForm.interests.split(",").map(i => i.trim()).filter(Boolean)
            : null,
          status: editForm.status,
          group_number: editForm.group_number ? parseInt(editForm.group_number) : null,
        })
        .eq("id", editingProfile.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      setShowEditModal(false);
      setEditingProfile(null);
      await loadProfiles(); // Reload to show updated data
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const formatLastActive = (lastActive: string | null) => {
    if (!lastActive) return "Never";
    const date = new Date(lastActive);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const filteredStudents = profiles.filter((profile) => {
    const name = profile.full_name || "";
    const course = profile.course || "";
    const interests = profile.interests || [];

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCourse =
      courseFilter === "all-courses" || course === courseFilter;
    const matchesStatus =
      statusFilter === "all-status" || profile.status === statusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, courseFilter, statusFilter]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Check if user is authenticated */}
        {!currentUser ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-4">Welcome to Lisio Buddy</h1>
              <p className="text-muted-foreground mb-8">
                Please sign up or login to view all students available and connect with study partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero"
                  onClick={() => window.location.href = '/login'}
                  className="flex-1 sm:flex-none"
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/signup'}
                  className="flex-1 sm:flex-none"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lisio Buddy Dashboard</h1>
            <p className="text-muted-foreground">
              Find and connect with study partners
            </p>
          </div>
          {userRole === 'admin' && (
            <Button variant="hero" className="mt-4 lg:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          )}
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
              <SelectItem value="all-courses">All Courses</SelectItem>
              {availableCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students Table/Cards */}
        <div className="bg-card rounded-lg border border-border shadow-study">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ||
                courseFilter !== "all-courses" ||
                statusFilter !== "all-status"
                  ? "Try adjusting your filters to see more results."
                  : "No students yet. Add your first student."}
              </p>
              {userRole === 'admin' && (
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="p-4 font-medium">#</th>
                      <th className="p-4 font-medium">Student</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Course</th>
                      <th className="p-4 font-medium">Interests</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((profile, index) => (
                      <tr
                        key={profile.id}
                        className="border-b border-border last:border-b-0 hover:bg-muted/50"
                      >
                        <td className="p-4">
                          <div className="font-medium text-center">
                            {startIndex + index + 1}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={profile.avatar || ""} />
                              <AvatarFallback>
                                {(profile.full_name || "N A")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {profile.full_name || "No Name"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {profile.year || "No Year"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {profile.email || "No Email"}
                        </td>
                        <td className="p-4">{profile.course || "No Course"}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {(profile.interests || [])
                              .slice(0, 2)
                              .map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {interest}
                                </Badge>
                              ))}
                            {(profile.interests || []).length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{(profile.interests || []).length - 2}
                              </Badge>
                            )}
                            {(!profile.interests ||
                              profile.interests.length === 0) && (
                              <span className="text-xs text-muted-foreground">
                                No interests
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={getStatusStyle(
                              profile.status || "offline"
                            )}
                          >
                            {getStatusText(profile.status || "offline")}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewProfile(profile)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {(userRole === 'admin' ||
                              profile.user_id === currentUser?.id) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProfile(profile)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4 p-4">
                {currentStudents.map((profile, index) => (
                  <div 
                    key={profile.id}
                    className="bg-card border border-border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={profile.avatar || ""} />
                          <AvatarFallback>
                            {(profile.full_name || "N A")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {profile.full_name || "No Name"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {profile.course || "No Course"} • {profile.year || "No Year"}
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={getStatusStyle(profile.status || "offline")}
                      >
                        {getStatusText(profile.status || "offline")}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Email: </span>
                        <span className="text-muted-foreground">
                          {profile.email || "No Email"}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Interests: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(profile.interests || []).map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                          {(!profile.interests || profile.interests.length === 0) && (
                            <span className="text-xs text-muted-foreground">
                              No interests
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewProfile(profile)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      {(userRole === 'admin' || profile.user_id === currentUser?.id) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProfile(profile)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Student Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
            </DialogHeader>
            {selectedProfile && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedProfile.avatar || ""} />
                    <AvatarFallback className="text-lg">
                      {(selectedProfile.full_name || "N A")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {selectedProfile.full_name || "No Name"}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedProfile.course || "No Course"} •{" "}
                      {selectedProfile.year || "No Year"}
                    </p>
                    <Badge
                      className={getStatusStyle(
                        selectedProfile.status || "offline"
                      )}
                    >
                      {getStatusText(selectedProfile.status || "offline")}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Email: {selectedProfile.email || "No Email"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last Active:{" "}
                      {formatLastActive(selectedProfile.last_active)}
                    </p>
                    {selectedProfile.group_number && (
                      <p className="text-sm text-muted-foreground">
                        Group: {selectedProfile.group_number}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {(selectedProfile.interests || []).map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {(!selectedProfile.interests ||
                        selectedProfile.interests.length === 0) && (
                        <span className="text-sm text-muted-foreground">
                          No interests listed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedProfile.description && (
                  <div>
                    <h4 className="font-medium mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedProfile.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Profile Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            {editingProfile && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      value={editForm.course}
                      onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                      placeholder="Enter course"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                      placeholder="Enter year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group_number">Group Number</Label>
                    <Input
                      id="group_number"
                      type="number"
                      value={editForm.group_number}
                      onChange={(e) => setEditForm({ ...editForm, group_number: e.target.value })}
                      placeholder="Enter group number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma separated)</Label>
                  <Input
                    id="interests"
                    value={editForm.interests}
                    onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                    placeholder="Enter interests separated by commas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
