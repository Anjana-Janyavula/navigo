import { useState } from "react";

import {
  LanguageProvider,
  useLanguage
} from "./context/LanguageContext";

import {
  UserProvider,
  useUser
} from "./context/UserContext";

import LanguageSelector from "./components/LanguageSelector";
import WelcomeScreen from "./components/WelcomeScreen";
import RoleSelector from "./components/RoleSelector";
import StudentForm from "./components/StudentForm";
import VisitorForm from "./components/VisitorForm";
import FacultyForm from "./components/FacultyForm";
import WelcomeUser from "./components/WelcomeUser";
import ChatInterface from "./components/ChatInterface";
import LoadingScreen from "./components/LoadingScreen";

import {
  createUser,
  getApiErrorMessage
} from "./services/api";

function Flow() {
  const {
    language,
    setLanguage,
    strings
  } = useLanguage();

  const {
    saveUser,
    user
  } = useUser();

  const [screen, setScreen] =
    useState(() =>
      sessionStorage.getItem(
        "navigo_user"
      )
        ? "chat"
        : "language"
    );

  const [role, setRole] =
    useState(null);

  const [studentMode, setStudentMode] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const finish = async (profile) => {
    setLoading(true);

    try {
      const createdUser =
        await createUser({
          ...profile,
          language
        });

      saveUser(createdUser);

      setScreen("welcome");

    } catch (error) {
      const message = getApiErrorMessage(error);

      alert(message);
      console.error("Profile creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (screen === "language") {
    return (
      <LanguageSelector
        onSelect={(selectedLanguage) => {
          setLanguage(selectedLanguage);
          setScreen("welcomeScreen");
        }}
      />
    );
  }

  if (screen === "welcomeScreen") {
    return (
      <WelcomeScreen
        onStart={() =>
          setScreen("roles")
        }
      />
    );
  }

  if (screen === "roles") {
    return (
      <RoleSelector
        onBack={() =>
          setScreen("welcomeScreen")
        }
        onSelect={(selectedRole) => {
          setRole(selectedRole);
          setStudentMode(null);

          if (
            selectedRole ===
            "student"
          ) {
            setScreen("studentChoice");
          } else {
            setScreen(selectedRole);
          }
        }}
      />
    );
  }

  if (screen === "studentChoice") {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center p-6">

        <div className="max-w-2xl w-full">

          <button
            onClick={() =>
              setScreen("roles")
            }
            className="mb-5 text-slate-500"
          >
            ← {strings.back}
          </button>

          <h2 className="text-4xl font-black mb-6">
            {strings.student}
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">

            <button
              onClick={() => {
                setStudentMode(
                  "fresher"
                );
                setScreen(
                  "studentForm"
                );
              }}
              className="bg-white p-7 rounded-3xl text-left shadow-sm border"
            >
              <b className="text-2xl">
                {strings.fresher}
              </b>

              <p className="text-slate-500 mt-2">
                Name, phone and branch
              </p>
            </button>

            <button
              onClick={() => {
                setStudentMode(
                  "regular"
                );
                setScreen(
                  "studentForm"
                );
              }}
              className="bg-white p-7 rounded-3xl text-left shadow-sm border"
            >
              <b className="text-2xl">
                {strings.regularStudent}
              </b>

              <p className="text-slate-500 mt-2">
                Profile plus roll number
                and year
              </p>
            </button>

          </div>

        </div>
      </div>
    );
  }

  if (screen === "studentForm") {
    return (
      <StudentForm
        mode={studentMode}
        onBack={() =>
          setScreen("studentChoice")
        }
        onSubmit={finish}
      />
    );
  }

  if (screen === "visitor") {
    return (
      <VisitorForm
        onBack={() =>
          setScreen("roles")
        }
        onSubmit={finish}
      />
    );
  }

  if (screen === "faculty") {
    return (
      <FacultyForm
        onBack={() =>
          setScreen("roles")
        }
        onSubmit={finish}
      />
    );
  }

  if (screen === "welcome") {
    return (
      <WelcomeUser
        name={
          user?.name ||
          "there"
        }
        onDone={() =>
          setScreen("chat")
        }
      />
    );
  }

  return <ChatInterface />;
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Flow />
      </UserProvider>
    </LanguageProvider>
  );
}