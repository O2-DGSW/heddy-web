import { NavLink } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";

const TABS = [
  { label: "시술기록", to: "/cuts" },
  { label: "QR 코드", to: "/cuts/qr-code" },
  { label: "QR 리딩", to: "/cuts/qr-reading" },
  { label: "공개설정", to: "/cuts/public" },
] as const;

export const CutsTabBar = () => {
  return (
    <nav className="flex justify-center" style={{ borderBottom: `1px solid ${lightTheme.line.alternative}` }}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={`relative flex flex-col items-center px-4 py-3 transition-colors ${font.headline2.medium}`}
          style={({ isActive }) => ({
            color: isActive ? lightTheme.label.strong : lightTheme.label.assistive,
          })}
        >
          {({ isActive }) => (
            <>
              {tab.label}
              {isActive && (
                <div
                  className="absolute -bottom-px h-0.75 w-12 rounded-full"
                  style={{ backgroundColor: lightTheme.label.strong }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};