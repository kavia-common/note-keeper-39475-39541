export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // blue-600
    secondary: "#F59E0B", // amber-500
    success: "#10B981", // emerald-500
    error: "#EF4444", // red-500
    background: "#f9fafb", // gray-50
    surface: "#ffffff",
    text: "#111827", // gray-900
    textMuted: "#6B7280", // gray-500
    border: "#E5E7EB", // gray-200
    shadow: "rgba(17, 24, 39, 0.08)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 12px rgba(17, 24, 39, 0.08)",
    lg: "0 12px 24px rgba(17, 24, 39, 0.12)",
  },
  gradient:
    "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(243,244,246,0.6))", // from-blue-500/10 to-gray-50
};

// PUBLIC_INTERFACE
export function applyThemeToDocument() {
  /** Apply CSS variables to document root based on theme. */
  const root = document.documentElement;
  const { colors, radius, shadow } = theme;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-error", colors.error);
  root.style.setProperty("--color-background", colors.background);
  root.style.setProperty("--color-surface", colors.surface);
  root.style.setProperty("--color-text", colors.text);
  root.style.setProperty("--color-text-muted", colors.textMuted);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--shadow-color", colors.shadow);
  root.style.setProperty("--radius-sm", radius.sm);
  root.style.setProperty("--radius-md", radius.md);
  root.style.setProperty("--radius-lg", radius.lg);
  root.style.setProperty("--radius-xl", radius.xl);
  root.style.setProperty("--shadow-sm", shadow.sm);
  root.style.setProperty("--shadow-md", shadow.md);
  root.style.setProperty("--shadow-lg", shadow.lg);
  root.style.setProperty("--gradient", theme.gradient);
}
