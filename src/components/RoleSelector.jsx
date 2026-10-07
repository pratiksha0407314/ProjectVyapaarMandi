import {
  Sprout,
  Store,
  Truck,
  ShieldCheck
} from "lucide-react";

function RoleSelector({
  selectedRole,
  onSelect,
  includeAdmin = false
}) {
  const roles = [
    {
      id: "farmer",
      label: "Farmer",
      icon: Sprout
    },
    {
      id: "vendor",
      label: "Vendor",
      icon: Store
    },
    {
      id: "transporter",
      label: "Transporter",
      icon: Truck
    }
  ];

  if (includeAdmin) {
    roles.push({
      id: "admin",
      label: "Admin",
      icon: ShieldCheck
    });
  }

  return (
    <div className="role-section">
      <p className="field-label">Select your role</p>

      <div className="role-grid">
        {roles.map((role) => {
          const Icon = role.icon;

          return (
            <button
              key={role.id}
              type="button"
              className={`role-button ${
                selectedRole === role.id ? "selected" : ""
              }`}
              onClick={() => onSelect(role.id)}
            >
              <Icon size={19} />
              <span>{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RoleSelector;