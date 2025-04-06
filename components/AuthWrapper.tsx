import { AuthProvider } from "@/context/authContext";
import { ReactNode } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};
export default AuthWrapper;
