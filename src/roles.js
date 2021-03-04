export default [
  { name: "admin", role: "ROLE_ADMIN", getter: "user/isAdmin" },
  { name: "etudiant", role: "ROLE_ETUDIANT", getter: "user/isEtudiant" },
  { name: "intervenant", role: "ROLE_INTER", getter: "user/isIntervenant" },
  { name: "responsableFormation", role: "ROLE_RESPO", getter: "user/isResponsableFormation" },
  { name: "assistantPedagogique", role: "ROLE_ASSISTANT", getter: "user/isAssistantPedagogique" }
]