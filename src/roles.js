export default [
  { name: "admin", role: "ROLE_ADMIN", getter: "user/isAdmin" },
  { name: "etudiant", role: "ROLE_ETUDIANT", getter: "user/isEtudiant" },
  { name: "intervenant", role: "ROLE_INTERVENANT", getter: "user/isIntervenant" },
  { name: "responsableFormation", role: "ROLE_RESPONSABLE_FORMATION", getter: "user/isResponsableFormation" },
  { name: "assistantPedagogique", role: "ROLE_ASSISTANT_PEDAGOGIQUE", getter: "user/isAssistantPedagogique" }
]