// src/pages/ChangePasswordPage.jsx
import SettingSection from "../components/settings/SettingSection";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import { Lock } from "lucide-react";

const ChangePasswordPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <SettingSection icon={Lock} title='Change Password'>
        <ChangePasswordForm />
      </SettingSection>
    </div>
  );
};

export default ChangePasswordPage;