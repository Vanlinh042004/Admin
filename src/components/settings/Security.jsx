// src/components/settings/Security.jsx
import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const navigate = useNavigate(); 

  return (
    <SettingSection icon={Lock} title={"Security"}>
      <ToggleSwitch
        label={"Two-Factor Authentication"}
        isOn={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}
      />
      <div className='mt-4'>
        <button
          onClick={() => navigate('/settings/change_password')} 
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
          transition duration-200
          '
        >
          Change Password
        </button>
      </div>
    </SettingSection>
  );
};

export default Security;