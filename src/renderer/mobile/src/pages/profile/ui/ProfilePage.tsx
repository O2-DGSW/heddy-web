import { lightTheme } from "@design-tokens";

import { FieldOfTopProfile } from "@/features/profile/ui/FieldOfTopProfile.tsx";
import { FieldOfSetting } from "@/features/profile/ui/FieldOfSetting.tsx";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[31%]">
        <FieldOfTopProfile />
      </div>
      <div className="flex-1" style={{ backgroundColor: lightTheme.fill.normal }}>
        <FieldOfSetting />
      </div>
    </div>
  );
};
