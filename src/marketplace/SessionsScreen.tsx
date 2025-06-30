import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Calendar, 
  MessageCircle, 
  FileText, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain
} from 'lucide-react';
import { sampleSessions, sampleExperts, sampleServices } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SessionsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function SessionsScreen({ selectedRole, profileData, toggleAICompanion }: SessionsScreenProps) {
  const [activeTab, setActiveTab] = useState('active-sessions');
  const [messageContent, setMessageContent] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sessionTabs = [
    { id: 'active-sessions', label: 'Active sessions' },
    { id: 'session-history', label: 'Session history' },
    { id: 'upcoming-appointments', label: 'Upcoming appointments' },
    { id: 'materials-notes', label: 'Materials & notes' },
    { id: 'communication', label: 'Communication' },
    { id: 'feedback', label: 'Feedback' }
  ];

  const activeSessions = sampleSessions.filter(session => session.status === 'active');
  const completedSessions = sampleSessions.filter(session => session.status === 'completed');
  const upcomingSessions = sampleSessions.filter(session => session.status === 'scheduled');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExpertById = (expertId: string) => {
    return sampleExperts.find(expert => expert.id === expertId);
  };

  const getServiceById = (serviceId: string) => {
    return sampleServices.find(service => service.id === serviceId);
  };

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageContent);
      setMessageContent('');
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackComment.trim()) {
      // In a real app, this would submit the feedback
      console.log('Submitting feedback:', { rating: feedbackRating, comment: feedbackComment });
      setFeedbackComment('');
      setFeedbackRating(5);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab="expert-marketplace"
        setActiveMainTab={() => {}}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Marketplace</span>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Sessions Management</h1>
              <p className="text-white/80">Manage your active sessions and track progress</p>
            </div>

            {/* Session Tabs */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <div className="border-b border-white/20">
                <div className="flex overflow-x-auto">
                  {sessionTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-white/10 text-white border-b-2 border-purple-300'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {/* Active Sessions Tab */}
                {activeTab === 'active-sessions' && (
                  <div className="space-y-6">
                    {activeSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No active sessions</h3>
                        <p className="text-white/70">You don't have any active sessions at the moment</p>
                      </div>
                    ) : (
                      activeSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                    <p className="text-white/80">with {expert?.name}</p>
                                    <p className="text-white/60 text-sm">Started {formatDate(session.startDate)}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-green-400 font-semibold">{session.progress}% Complete</div>
                                    <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${session.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                
                                {session.nextMilestone && (
                                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                                    <h4 className="text-blue-300 font-semibold text-sm mb-1">Next Milestone</h4>
                                    <p className="text-white/80 text-sm">{session.nextMilestone}</p>
                                  </div>
                                )}

                                {session.actionItems.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-white font-semibold text-sm mb-2">Action Items</h4>
                                    <ul className="space-y-1">
                                      {session.actionItems.map((item, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                          <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                          <span className="text-white/80 text-sm">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="flex items-center space-x-4">
                                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                                    Continue Session
                                  </button>
                                  <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Session History Tab */}
                {activeTab === 'session-history' && (
                  <div className="space-y-6">
                    {completedSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Clock className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No completed sessions</h3>
                        <p className="text-white/70">Your completed sessions will appear here</p>
                      </div>
                    ) : (
                      completedSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                <p className="text-white/80">with {expert?.name}</p>
                                <p className="text-white/60 text-sm">
                                  {formatDate(session.startDate)} - {session.endDate ? formatDate(session.endDate) : 'Ongoing'}
                                </p>
                                
                                {session.feedback && (
                                  <div className="mt-3 bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star 
                                            key={i} 
                                            className={`h-4 w-4 ${i < session.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                          />
                                        ))}
                                      </div>
                                      <span className="text-green-300 text-sm">Your Rating</span>
                                    </div>
                                    <p className="text-white/80 text-sm italic">"{session.feedback.comment}"</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Upcoming Appointments Tab */}
                {activeTab === 'upcoming-appointments' && (
                  <div className="space-y-6">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No upcoming appointments</h3>
                        <p className="text-white/70">Your scheduled appointments will appear here</p>
                      </div>
                    ) : (
                      upcomingSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                <p className="text-white/80">with {expert?.name}</p>
                                <p className="text-white/60 text-sm">Scheduled for {formatDate(session.startDate)}</p>
                                
                                {session.actionItems.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-white font-semibold text-sm mb-2">Preparation Tasks</h4>
                                    <ul className="space-y-1">
                                      {session.actionItems.map((item, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                          <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                          <span className="text-white/80 text-sm">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="flex items-center space-x-4 mt-4">
                                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                                    Join Session
                                  </button>
                                  <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
                                    Reschedule
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Materials & Notes Tab */}
                {activeTab === 'materials-notes' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-blue-300" />
                          <span>Session Materials</span>
                        </h3>
                        <div className="space-y-3">
                          {activeSessions.flatMap(session => session.materials).map((material, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                              <FileText className="h-5 w-5 text-blue-400" />
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">{material.name}</h4>
                                <p className="text-white/60 text-xs">{material.type}</p>
                              </div>
                              <button className="text-purple-300 hover:text-purple-200 text-sm transition-colors">
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Session Notes</h3>
                        <div className="space-y-3">
                          {activeSessions.filter(session => session.notes).map((session) => {
                            const expert = getExpertById(session.expertId);
                            return (
                              <div key={session.id} className="p-3 bg-white/5 rounded-lg">
                                <h4 className="text-white font-medium text-sm mb-1">Notes from {expert?.name}</h4>
                                <p className="text-white/80 text-sm">{session.notes}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Communication Tab */}
                {activeTab === 'communication' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5 text-green-300" />
                        <span>Send Message to Expert</span>
                      </h3>
                      <div className="space-y-4">
                        <textarea
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Write your message..."
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          rows={4}
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Recent Communications</h3>
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
                        <p className="text-white/70">No recent communications</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Tab */}
                {activeTab === 'feedback' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Submit Feedback</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Rating</label>
                          <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setFeedbackRating(rating)}
                                className="transition-colors"
                              >
                                <Star 
                                  className={`h-6 w-6 ${rating <= feedbackRating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Comments</label>
                          <textarea
                            value={feedbackComment}
                            onChange={(e) => setFeedbackComment(e.target.value)}
                            placeholder="Share your experience..."
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            rows={4}
                          />
                        </div>
                        <button 
                          onClick={handleSubmitFeedback}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                        >
                          Submit Feedback
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Your Previous Feedback</h3>
                      <div className="space-y-4">
                        {activeSessions.filter(session => session.feedback).map((session) => {
                          const expert = getExpertById(session.expertId);
                          const service = getServiceById(session.serviceId);
                          
                          return (
                            <div key={session.id} className="p-4 bg-white/5 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-white font-medium">{service?.serviceName}</h4>
                                  <p className="text-white/70 text-sm">with {expert?.name}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < session.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-white/80 text-sm italic">"{session.feedback?.comment}"</p>
                              <p className="text-white/60 text-xs mt-2">{session.feedback?.date.toLocaleDateString()}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default SessionsScreen;