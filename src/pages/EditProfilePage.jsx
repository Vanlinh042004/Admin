// src/pages/EditProfilePage.jsx
import SettingSection from "../components/settings/SettingSection";
import EditProfileForm from "../components/settings/EditProfileForm";
import { User } from "lucide-react";

const EditProfilePage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <SettingSection icon={User} title='Edit Profile'>
        <EditProfileForm />
      </SettingSection>
    </div>
  );
};

export default EditProfilePage;