"use client";
import Image from "next/image";
import { ROUTES } from '@/config'

import React, { useState, useEffect, useCallback } from "react";
import { ROUTES } from '@/config'
import { authService, User } from "@/lib/auth";
import { ROUTES } from '@/config'
import {
  directoryService,
  DirectoryFilters,
  LONDON_AREAS,
  COMMON_INTERESTS,
} from "@/lib/directory";
import { connectionService } from "@/lib/connections";
import { ROUTES } from '@/config'
import { UserProfile } from "@/lib/connections";
import { ROUTES } from '@/config'
import { useRouter } from "next/navigation";
import { ROUTES } from '@/config'
import {
  Search,
  Filter,
  MapPin,
  Heart,
  Users,
  Crown,
  Star,
  Calendar,
  Activity,
  ChevronDown,
  ChevronRight,
  UserPlus,
  MessageCircle,
  Eye,
  Camera,
  Clock,
  Award,
  Sparkles,
  Globe,
  X,
  SlidersHorizontal,
} from "lucide-react";

interface MemberCardProps {
  member: UserProfile;
  currentUser: User | null;
  onViewProfile: (memberId: string) => void;
  onSendConnection: (memberId: string) => void;
  onSendMessage: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  currentUser,
  onViewProfile,
  onSendConnection,
  onSendMessage,
}) => {
  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: {
        icon: <Users className="w-3 h-3" />,
        color: "bg-secondary-100 text-secondary-600",
        label: "Free",
      },
      core: {
        icon: <Star className="w-3 h-3" />,
        color: "bg-[#FF6B6B] text-white",
        label: "Core",
      },
      premium: {
        icon: <Crown className="w-3 h-3" />,
        color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        label: "Premium",
      },
    };
    return badges[tier as keyof typeof badges] || badges.free;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 1) return "Today";
    if (diffInDays < 7) return `${Math.floor(diffInDays)}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;

    return date.toLocaleDateString();
  };

  const canMessage = () => {
    if (member.privacy.allowMessages === "everyone") return true;
    if (!currentUser) return false;
    if (
      member.privacy.allowMessages === "premium" &&
      currentUser.membershipTier === "premium"
    )
      return true;
    // In real app, check if connected for 'connections' option
    return false;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]"></div>
        <div className="absolute -bottom-8 left-6">
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-full p-1">
              <div className="w-full h-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-lg font-bold">
                {member.profileImage ? (
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>
            </div>
            {member.isOnline && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-action-500 rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>

        {/* Membership Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              getMembershipBadge(member.membershipTier).color
            }`}
          >
            {getMembershipBadge(member.membershipTier).icon}
            <span>{getMembershipBadge(member.membershipTier).label}</span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-10 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-secondary-600 mt-1">
            {member.privacy.showAge && (
              <>
                <span>{member.age} years old</span>
                <span>•</span>
              </>
            )}
            {member.privacy.showLocation && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{member.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-secondary-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

        {/* Interests */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {member.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
              >
                {interest}
              </span>
            ))}
            {member.interests.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                +{member.interests.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {member.connectionsCount}
            </div>
            <div className="text-xs text-secondary-600">Connections</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {member.eventsAttended}
            </div>
            <div className="text-xs text-secondary-600">Events</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {member.photos.length}
            </div>
            <div className="text-xs text-secondary-600">Photos</div>
          </div>
        </div>

        {/* Badges */}
        {member.badges.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <Award className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-secondary-600">Achievements</span>
            </div>
            <div className="flex space-x-1">
              {member.badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="text-xs p-1 rounded"
                  title={badge.description}
                >
                  <span className="text-base">{badge.icon}</span>
                </div>
              ))}
              {member.badges.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{member.badges.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Last Active */}
        <div className="text-xs text-gray-500 mb-4 flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Active {formatTimeAgo(member.lastActive)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewProfile(member.id)}
            className="flex-1 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onSendConnection(member.id)}
            className="flex-1 px-3 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors text-sm font-medium flex items-center justify-center space-x-1"
          >
            <UserPlus className="w-4 h-4" />
            <span>Connect</span>
          </button>
          {canMessage() && (
            <button
              onClick={() => onSendMessage(member.id)}
              className="px-3 py-2 bg-[#4ECDC4] text-white rounded-lg hover:bg-[#45b7b8] transition-colors text-sm font-medium flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Directory() {
  const [user, setUser] = useState<User | null>(null);
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestedMembers, setSuggestedMembers] = useState<UserProfile[]>([]);
  const [newMembers, setNewMembers] = useState<UserProfile[]>([]);
  const [onlineMembers, setOnlineMembers] = useState<UserProfile[]>([]);

  const [filters, setFilters] = useState<DirectoryFilters>({
    search: "",
    location: [],
    interests: [],
    membershipTier: "all",
    sortBy: "newest",
  });

  const router = useRouter();

  // Memoized loaders
  const loadMembers = useCallback(
    async (currentUser: User, reset: boolean = false) => {
      try {
        const currentPage = reset ? 1 : page;
        if (reset) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const result = await directoryService.searchMembers(
          currentUser?.id || "",
          filters,
          currentPage,
          20
        );

        if (reset) {
          setMembers(result.members);
          setPage(2); // Next page to load
        } else {
          setMembers((prev) => [...prev, ...result.members]);
          setPage((prev) => prev + 1);
        }

        setTotal(result.total);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters, page]
  );

  const loadInitialData = useCallback(
    async (currentUser: User | null) => {
      try {
        const [suggested, newMembersData, online] = await Promise.all([
          currentUser
            ? directoryService.getSuggestedMembers(currentUser.id, 6)
            : Promise.resolve([]),
          directoryService.getNewMembers(8),
          directoryService.getOnlineMembers(10),
        ]);

        if (currentUser) setSuggestedMembers(suggested);
        setNewMembers(newMembersData);
        setOnlineMembers(online);

        await loadMembers(currentUser || ({ id: "" } as User), true);
      } catch (error) {
        console.error("Error loading directory data:", error);
      }
    },
    [loadMembers]
  );

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      loadInitialData(currentUser);
    } else {
      loadInitialData(null);
    }
  }, [router, loadInitialData]);

  useEffect(() => {
    if (user) {
      loadMembers(user, true);
    } else {
      loadMembers({ id: "" } as User, true);
    }
  }, [filters, user, loadMembers]);

  // (removed duplicate non-memoized loaders)

  const handleFilterChange = (key: keyof DirectoryFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset pagination
  };

  const removeLocationFilter = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location?.filter((l) => l !== location) || [],
    }));
  };

  const removeInterestFilter = (interest: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests?.filter((i) => i !== interest) || [],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      location: [],
      interests: [],
      membershipTier: "all",
      sortBy: "newest",
    });
  };

  const handleViewProfile = (memberId: string) => {
    router.push(`/directory/member/${memberId}`);
  };

  const handleSendConnection = async (memberId: string) => {
    if (!user) {
      router.push({ROUTES.auth.login});
      return;
    }

    // In real app, would show connection request modal
    try {
      await connectionService.sendConnectionRequest(
        user.id,
        memberId,
        "Hi! I'd love to connect with you through LusoTown!"
      );
      alert("Connection request sent!");
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Error sending connection request");
    }
  };

  const handleSendMessage = (memberId: string) => {
    if (!user) {
      router.push({ROUTES.auth.login});
      return;
    }
    router.push(`/chat/direct/${memberId}`);
  };

  if (loading && members.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    );
  }

  // Guests can view directory; actions will prompt login

  const activeFiltersCount = [
    filters.search,
    ...(filters.location || []),
    ...(filters.interests || []),
    filters.membershipTier !== "all" ? filters.membershipTier : null,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Member Directory
              </h1>
              <p className="text-secondary-600 mt-1">
                Discover and connect with amazing women in your community
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-secondary-600">
                <span className="font-medium">{total.toLocaleString()}</span>{" "}
                members found
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search directory..."
                  value={filters.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                >
                  <option value="newest">Newest Members</option>
                  <option value="active">Most Active</option>
                  <option value="connections">Most Connected</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="age">By Age</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    showFilters || activeFiltersCount > 0
                      ? "bg-[#FF6B6B] text-white border-[#FF6B6B]"
                      : "border-secondary-300 hover:bg-gray-50"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-[#FF6B6B] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Location
                    </label>
                    <select
                      onChange={(e) => {
                        const location = e.target.value;
                        if (location && !filters.location?.includes(location)) {
                          handleFilterChange("location", [
                            ...(filters.location || []),
                            location,
                          ]);
                        }
                        e.target.value = "";
                      }}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                    >
                      <option value="">Add location...</option>
                      {LONDON_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Interests Filter */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Interests
                    </label>
                    <select
                      onChange={(e) => {
                        const interest = e.target.value;
                        if (
                          interest &&
                          !filters.interests?.includes(interest)
                        ) {
                          handleFilterChange("interests", [
                            ...(filters.interests || []),
                            interest,
                          ]);
                        }
                        e.target.value = "";
                      }}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                    >
                      <option value="">Add interest...</option>
                      {COMMON_INTERESTS.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Membership Tier */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Membership
                    </label>
                    <select
                      value={filters.membershipTier}
                      onChange={(e) =>
                        handleFilterChange("membershipTier", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                    >
                      <option value="all">All Members</option>
                      <option value="free">Free Members</option>
                      <option value="core">Core Members</option>
                      <option value="premium">Premium Members</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearAllFilters}
                      className="w-full px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filters.search && (
                      <span className="inline-flex items-center px-3 py-1 bg-[#FF6B6B] text-white text-sm rounded-full">
                        Search: "{filters.search}"
                        <button
                          onClick={() => handleFilterChange("search", "")}
                          className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.location?.map((location) => (
                      <span
                        key={location}
                        className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {location}
                        <button
                          onClick={() => removeLocationFilter(location)}
                          className="ml-2 hover:bg-primary-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.interests?.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {interest}
                        <button
                          onClick={() => removeInterestFilter(interest)}
                          className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.membershipTier &&
                      filters.membershipTier !== "all" && (
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                          <Crown className="w-3 h-3 mr-1" />
                          {filters.membershipTier} members
                          <button
                            onClick={() =>
                              handleFilterChange("membershipTier", "all")
                            }
                            className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats/Categories */}
          {!loading && activeFiltersCount === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {/* Suggested Members */}
              {suggestedMembers.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-5 h-5 text-accent-500" />
                    <h3 className="font-semibold text-gray-900">Suggested</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {suggestedMembers.length}
                  </p>
                  <p className="text-xs text-secondary-600">
                    Based on your interests
                  </p>
                </div>
              )}

              {/* New Members */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-action-500" />
                  <h3 className="font-semibold text-gray-900">New</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {newMembers.length}
                </p>
                <p className="text-xs text-secondary-600">Joined this month</p>
              </div>

              {/* Online Now */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="w-5 h-5 text-[#4ECDC4]" />
                  <h3 className="font-semibold text-gray-900">Online</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {onlineMembers.length}
                </p>
                <p className="text-xs text-secondary-600">Active right now</p>
              </div>

              {/* Total Members */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="w-5 h-5 text-[#FF6B6B]" />
                  <h3 className="font-semibold text-gray-900">Total</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{total}</p>
                <p className="text-xs text-secondary-600">Community members</p>
              </div>
            </div>
          )}
        </div>

        {/* Members Grid */}
        {members.length === 0 && !loading ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No members found
            </h3>
            <p className="text-secondary-600 mb-6">
              Try adjusting your search filters to find more members.
            </p>
            <button onClick={clearAllFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  currentUser={user}
                  onViewProfile={handleViewProfile}
                  onSendConnection={handleSendConnection}
                  onSendMessage={handleSendMessage}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    loadMembers(user || ({ id: "" } as User), false)
                  }
                  disabled={loadingMore}
                  className="px-6 py-3 bg-white border border-secondary-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-secondary-300 border-t-[#FF6B6B] rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Load More Members"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
