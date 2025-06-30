import React from 'react';
import { Edit, MapPin } from 'lucide-react';

// Profile data coming from App.tsx is still the flat structure used across the
// rest of the application, so we only type the properties we actually need here.
export interface FlatProfileData {
  fullName: string;
  profilePicture?: string;
  currentOccupation: string;
  country: string;
}

interface ProfileHeaderProps {
  profileData: FlatProfileData;
  selectedRole: 'founder' | 'investor' | 'expert';
  onEditProfile: () => void;
}

/**
 * ProfileHeader component
 * 
 * Displays the user's profile picture, name, title, role, and location.
 * Includes an Edit Profile button.
 * Used across all profile section screens.
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  selectedRole,
  onEditProfile
}) => {
  
  // Get role-specific styling
  const getRoleTagStyles = (role: 'founder' | 'investor' | 'expert'): string => {
    switch (role) {
      case 'founder':
        return 'bg-purple-500/20 text-purple-300';
      case 'investor':
        return 'bg-blue-500/20 text-blue-300';
      case 'expert':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Get first letter of name for avatar fallback
  const getInitial = (): string => {
    return profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture */}
        <div className="relative">
          {profileData.profilePicture ? (
            <img 
              src={profileData.profilePicture} 
              alt={profileData.fullName} 
              className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">{getInitial()}</span>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-white mb-1">
            {profileData.fullName || 'Your Name'}
          </h1>
          <p className="text-white/80 text-lg mb-2">
            {profileData.currentOccupation || 'Your Title'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
            {/* Role Tag */}
            <span className={`px-3 py-1 rounded-full text-sm ${getRoleTagStyles(selectedRole)}`}>
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </span>
            
            {/* Location */}
            {profileData.country && (
              <div className="flex items-center space-x-1 text-white/60 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{profileData.country}</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div>
          <button 
            onClick={onEditProfile}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
