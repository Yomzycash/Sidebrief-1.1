export const useActions = ({
  allEmails,
  allLaunchEmails,
  allDraftLaunchEmails,
  allSubmittedLaunchEmails,
  allManageEmails,
  allDraftManageEmails,
  allSubmittedManageEmails,
  allTaxEmails,
  allDraftTaxEmails,
  allSubmittedTaxEmails,
  allComplianceEmails,
  allDraftComplianceEmails,
  allSubmittedComplianceEmails,
  allIntellectualEmails,
  allDraftIntellectualEmails,
  allSubmittedIntellectualEmails,
  allOnboardEmails,
  allDraftOnboardEmails,
  allSubmittedOnboardEmails,
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const customEmailFullLists = [
    {
      text: "All Users",
      emails: allEmails,
    },
    {
      text: "All Launch Users",
      emails: allLaunchEmails,
    },
    {
      text: "All Draft Launch Users",
      emails: allDraftLaunchEmails,
    },
    {
      text: "All Submitted Launch Users",
      emails: allSubmittedLaunchEmails,
    },
    {
      text: "All Manage Users",
      emails: allManageEmails,
    },
    {
      text: "All Draft Manage Users",
      emails: allDraftManageEmails,
    },
    {
      text: "All Submitted Manage Users",
      emails: allSubmittedManageEmails,
    },
    {
      text: "All Tax Users",
      emails: allTaxEmails,
    },
    {
      text: "All Draft Tax Users",
      emails: allDraftTaxEmails,
    },
    {
      text: "All Submitted Tax Users",
      emails: allSubmittedTaxEmails,
    },
    {
      text: "All Compliance Users",
      emails: allComplianceEmails,
    },
    {
      text: "All Draft Compliance Users",
      emails: allDraftComplianceEmails,
    },
    {
      text: "All Submitted Compliance Users",
      emails: allSubmittedComplianceEmails,
    },
    {
      text: "All Intellectual Users",
      emails: allIntellectualEmails,
    },
    {
      text: "All Draft Intellectual Users",
      emails: allDraftIntellectualEmails,
    },
    {
      text: "All Submitted Intellectual Users",
      emails: allSubmittedIntellectualEmails,
    },
    {
      text: "All Onboard Users",
      emails: allOnboardEmails,
    },
    {
      text: "All Draft Onboard Users",
      emails: allDraftOnboardEmails,
    },
    {
      text: "All Submitted Onboard Users",
      emails: allSubmittedOnboardEmails,
    },
  ];

  return { customEmailFullLists, isValidEmail };
};
