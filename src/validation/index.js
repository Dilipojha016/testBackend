const { Joi, celebrate, errors } = require("celebrate");

let validation = {
  
  reg: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   
  },
  login: {
    email: Joi.string().email().required(),
    
    password: Joi.string().required(),
  },
  
  updateUser: {
    deviceToken: Joi.string().allow("").optional(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    nickname: Joi.string().min(3).max(30).required(),
    boostr: Joi.boolean().optional(),
    activity: Joi.array().required(),
    unitsOfMeasure: Joi.number().allow("").optional(),
    unitOfType: Joi.string().required(),
    optSetting: Joi.array().allow("").optional(),
    department: Joi.string().allow("").optional(),
    division: Joi.string().allow("").optional(),
    location: Joi.string().allow("").optional(),
    category: Joi.array().allow("").optional(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    bio: Joi.string().required(),
    profileImageUrl: Joi.string().allow("").optional(),
    countryName: Joi.string().allow("").optional(),
    orgId: Joi.string().allow("").optional(),
    currentPassword: Joi.string().allow("").optional(),
    newPassword: Joi.string().allow("").optional(),
    wheelchair: Joi.boolean().allow("").optional(),
  },

  onboard: {
    deviceToken: Joi.string().allow("").optional(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    nickname: Joi.string().required().min(3).max(30).required(),
    activity: Joi.array().required(),
    unitOfType: Joi.string().required(),
    countryName: Joi.string().allow("").optional(),
    optSetting: Joi.array().allow("").optional(),
    boostr: Joi.boolean().required(),
    wheelchair: Joi.boolean().allow("").optional(),
    department: Joi.string().allow("").optional(),
    division: Joi.string().allow("").optional(),
    location: Joi.string().allow("").optional(),
    category: Joi.array().allow("").optional(),
    bio: Joi.string().required(),
    profileImageUrl: Joi.string().allow("").optional(),
  },
 

  addOrganization: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    status: Joi.string().optional(),
    theme: Joi.string().optional(),
    primaryLogo: Joi.string().allow("").optional(),
    featuredLogo: Joi.boolean().allow("").optional(),
    representive: Joi.string().allow("").optional(),
    fundraising: Joi.boolean().allow("").optional(),
    owner: Joi.string().allow("").optional(),
    officialEmail: Joi.string().required(),
    alternateEmail: Joi.string().email().allow("").optional(),
    administrators: Joi.array().allow("").optional(),
    password: Joi.string().allow("").optional(),
    address: Joi.string().required(),
    contactNo: Joi.string().required(),
    idProof: Joi.string().allow("").optional(),
    appLogo: Joi.string().required(),
    webLogo: Joi.string().required(),
    themeDefault: Joi.string().allow("").optional(),
    contactBoostr: Joi.string().allow("").optional(),
    userCount: Joi.number().optional(),
    contactDate: Joi.date().optional(),
  },
 

  updateOrganization: {
   contactBoostr: Joi.string().allow("").optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    status: Joi.string().optional(),
    theme: Joi.string().optional(),
    primaryLogo: Joi.string().allow("").optional(),
    featuredLogo: Joi.boolean().allow("").optional(),
    representive: Joi.string().allow("").optional(),
    fundraising: Joi.boolean().allow("").optional(),
    owner: Joi.string().allow("").optional(),
    officialEmail: Joi.string().required(),
    alternateEmail: Joi.string().email().allow("").optional(),
    administrators: Joi.array().allow("").optional(),
    address: Joi.string().required(),
    contactNo: Joi.string().required(),
    idProof: Joi.string().allow("").optional(),
    appLogo: Joi.string().required(),
    webLogo: Joi.string().required(),
    themeDefault: Joi.string().allow("").required(),
    id: Joi.string().allow("").optional(),
    userCount: Joi.number().optional(),
    contactDate: Joi.date().optional(),
  },
  updateOrg: {
    name: Joi.string().required(),
    status: Joi.string().required(),
    theme: Joi.string().required(),
    representive: Joi.string().required(),
    owner: Joi.string().required(),
    officialEmail: Joi.string().email().required(),
    alternateEmail: Joi.string().email().required(),
    address: Joi.string().required(),
    contactNo: Joi.string().required(),
    idProof: Joi.string().required(),
    appLogo: Joi.string().required(),
    webLogo: Joi.string().required(),
    password: Joi.string().allow("").required(),
    themeDefault: Joi.string().allow("").required(),
    id: Joi.string().allow("").optional(),
  },
  getOrganizationPage: {
    page: Joi.number().required(),
    search: Joi.string().allow("").optional(),
    type: Joi.string().optional(),
    orgId:Joi.string().allow("").optional(),
  },
  icontentReg: {
    name: Joi.string().required(),
    content: Joi.string().required(),
    title: Joi.string().allow("").optional(),
    status: Joi.string().allow("").optional(),
  },
  teamUpdate: {
    name: Joi.string().required(),
    about: Joi.string().required(),
    
    image: Joi.string().allow("").optional(),
  },

  
  updateicontent: {
    name: Joi.string().required(),
    content: Joi.string().required(),
    id: Joi.string().required(),
    title: Joi.string().allow("").optional(),
    status: Joi.string().allow("").optional(),
  },

  feedbackReg: {
    user_id: Joi.string().required(),
    feedback: Joi.string().required(),
    rating: Joi.number().min(1).max(10).required(),
  },
  faqReg: {
    question: Joi.string().required(),
    answer: Joi.string().required(),
    position: Joi.number().allow("").optional(),
    title: Joi.string().allow("").optional(),
    status: Joi.string().required(),
    
  },

  activityReg: {
    name: Joi.string().required(),
    icon: Joi.array().optional().items(Joi.string())
  },
  departmentReg: {
    name: Joi.string().required().trim(),
    status: Joi.string().required(),
  },
  catReg: {
    name: Joi.string().required().trim(),
    status: Joi.string().required(),
    orgId:Joi.string().allow("").optional(),
  },
  divisionReg: {
    name: Joi.string().required(),
    status: Joi.string().required(),
  },
  claim: {
    id: Joi.string().required(),
    reward_id: Joi.string().required(),
  },
  assignedGoal: {
    weeklySteps: Joi.number().max(70000).required(),
    manualEntry:Joi.boolean().allow("").optional(),
  },
  locationReg: {
    name: Joi.string().required(),
    status: Joi.string().required(),
  },
  forgetPassword: {
    email: Joi.string().email().required(),
  },
  verifyOTP: {
    otp: Joi.string().required(),
    email: Joi.string().email().required(),
  },

  updateFaq: {
    question: Joi.string().required(),
    answer: Joi.string().required(),
    id: Joi.string().allow("").optional(),
    position: Joi.number().allow("").optional(),
    status: Joi.string().required(),
    title: Joi.string().allow("").optional(),
  },
  updateActivity: {
    name: Joi.string().required(),
    id: Joi.string().allow("").optional(),
    status: Joi.string().required(),
  },
  updateDepartment: {
    name: Joi.string().required(),
    id: Joi.string().allow("").optional(),
    status: Joi.string().required(),
  },
  updateDivision: {
    name: Joi.string().required(),
    id: Joi.string().allow("").optional(),
    status: Joi.string().required(),
  },
  updateLocation: {
    name: Joi.string().required(),
    id: Joi.string().allow("").optional(),
    status: Joi.string().required(),
  },

  challenge: {
    name: Joi.string().required(),
    user_id: Joi.string().required(),
    type: Joi.string().required(),
    activity_type_id: Joi.array().required().items(Joi.string().required()),
    distance: Joi.number().optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional(),
    time: Joi.number().optional(),
    closed: Joi.boolean().required(),
    team_challenge: Joi.boolean().optional(),
    message: Joi.string().required(),
    fund_raise: Joi.boolean().optional(),
    fundraise_url: Joi.string().optional().allow(""),
    
    image: Joi.array().optional().items(Joi.string()),
    invitedUsersId: Joi.array().required().items(Joi.string()),
    invitedUsersEmail: Joi.array().optional().items(Joi.string()),
    masterChallengeId: Joi.string().optional(),
    location: Joi.array().optional().items(Joi.number()),
    address: Joi.string().optional(),
    recurring: Joi.boolean().optional(),
    frequency: Joi.string().optional().valid("daily","weekly","monthly", "", null),
    challengeContributionsId: Joi.string().optional().allow(""),
  },
  challenge_user_id: {
    user_id: Joi.string().required(),
    pageNo: Joi.number().optional(),
    limit: Joi.number().optional()
  },
  challenge_detail: {
    id: Joi.string().required()
  },
  createMasterChallenge: {
    name: Joi.string().required(),
    distance: Joi.number().required(),
    icon: Joi.string().required(),
    description: Joi.string().required(),
    detail: Joi.string().required()
  },
  inviteUser: {
    user_id: Joi.string().optional(),
    challenge_id: Joi.string().required(),
    email: Joi.string().optional()
  },
  userActivity: {
    userId: Joi.string().required(),
    activityTypeId: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    distance: Joi.number().required(),
    steps: Joi.number().required(),
    intensity: Joi.string().allow("").optional(),
    manualEntry: Joi.boolean().required(),
    isCountable: Joi.boolean().optional()
  },
  myActivityList: {
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    year: Joi.string().optional(),
    data: Joi.string().optional()
  },
  createRewards: {
    headline: Joi.string().required(),
    subhead: Joi.string().optional(),
    info_text: Joi.string().optional(),
    access_link: Joi.string().optional(),
    disclaimer: Joi.string().optional(),
    image: Joi.string().optional(),
    video: Joi.string().allow("").optional(),
    inventory: Joi.string().optional(),
    countryRegion: Joi.array().allow("").optional(),
    organization: Joi.string().allow("").optional(),
    expiryDate: Joi.date().required(),
    couponcode: Joi.array().required().items(Joi.string())
  },  
  updateReward: {
    id: Joi.string().required(),
    headline: Joi.string().required(),
    subhead: Joi.string().optional(),
    info_text: Joi.string().optional(),
    access_link: Joi.string().optional(),
    disclaimer: Joi.string().optional(),
    image: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    inventory: Joi.string().optional(),
    countryRegion: Joi.array().allow("").optional(),
    organization: Joi.string().allow("").optional(),
    expiryDate: Joi.date().required(),
    couponcode: Joi.array().required().allow("").optional()
  },  
  approveRejectChallenge: {
    _id: Joi.string().required(),
    status: Joi.string().required()
  },
  removeUserChallenge: {
    challenge_id: Joi.string().required(),
    user_id: Joi.string().optional(),
    team_id: Joi.string().optional()
  },
  joinOpenChallenge: {
    challengeId: Joi.string().required()
  },
  createBoostr: {
    challenge_id: Joi.string().required(),
    comment: Joi.string().required(),
    attachment: Joi.string().optional().allow("")
  },
  likeBoostr: {
    boostr_id: Joi.string().required(),
  },
  commentBoostr: {
    boostr_id: Joi.string().required(),
    comment: Joi.string().required()
  },
  orgId: {
    orgId: Joi.string().required(), 
  },
  createUserTeam: {
    name: Joi.string().required(),
    image: Joi.string().optional().allow(''),
    about: Joi.string().required(),
    closed: Joi.boolean().required(),
    invitedUsersId: Joi.array().required().items(Joi.string()),
    invitedUsersEmail: Joi.array().optional().items(Joi.string())
  },
  updatedUserTeam: {
    name: Joi.string().required(),
    image: Joi.string().optional().allow(''),
    about: Joi.string().required(),
    closed: Joi.boolean().required()
  },
  inviteUserToTeam: {
    user_id: Joi.string().optional(),
    email: Joi.string().optional(),
    user_team_id: Joi.string().required()
  },
  deleteUserFromTeam: {
    user_id: Joi.string().required(),
    user_team_id: Joi.string().required()
  },
  acceptOrRejectTeamInvitation: {
    id: Joi.string().required(),
    status: Joi.string().required()
  },
  teamLeaderBoard: {
    team_id: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    pageNo: Joi.number().required(),
    limit: Joi.number().required(),
    activityIds: Joi.array().items(Joi.string().optional()).required()
  },
  getCommentBoostr: {
    boostrId: Joi.string().required(),
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  inviteTeamOnChallenge: {
    team_id: Joi.string().required(),
    challenge_id: Joi.string().required()
  },
  publicProfile: {
    userId: Joi.string().required(),
    orgId: Joi.string().required()
  },

  createMessage: {
    team_id: Joi.string().required(),
    message: Joi.string().required(),
    image: Joi.string().allow("").optional(),
  },
  likeChat: {
    chat_id: Joi.string().required(),
  },
  commentChat: {
    chat_id: Joi.string().required(),
    comment: Joi.string().required()
  },
  getChatComment: {
    chat_id: Joi.string().required(),
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  getChatList: {
    team_id: Joi.string().required(),
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  createCrwc: {
    activity_type: Joi.array().required().items(Joi.string().required()),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    distance: Joi.number().optional()
  },
  crwcData: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  changeDesignation: {
    id: Joi.string().required(),
    designation: Joi.string().required()
  },
  challengeBoostrList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required(),
    challenge_id: Joi.string().required()
  },
  newFeedList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  wellnessList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  completedChallengeList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  openChallengeList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required(),
    activityId: Joi.array().optional().items(Joi.string()),
    name: Joi.string().optional().allow("",null)
  },
  invitedChallenges: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  liveChallenges: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  upcomingChallenges: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  teamChallengeLeaderBoardData: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required(),
    challengeId: Joi.string().required()
  },
  crwcLeaderBoard: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  myCompanyLeaderBoard: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  challengeLeaderBoard: {
    challengeId: Joi.string().required(),
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  getInviteTeamList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  notificationList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required(),
    isRead: Joi.number().required(),
    type: Joi.string().optional().allow("")
  },
  teamSuggestionList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  userSuggetionList: {
    pageNo: Joi.number().required(),
    limit: Joi.number().required()
  },
  addUserInteraction: Joi.array().items(Joi.object({
    userId: Joi.string().required(),
    sectionName: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    duration: Joi.number().required()
  })).required()
};
module.exports = validation;
