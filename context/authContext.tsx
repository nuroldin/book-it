"use client";

import { createContext, useContext, useEffect, useState } from "react";
import checkAuth from "@/app/actions/checkAuth";
import { Models } from "node-appwrite";

type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: (auth: boolean) => void;
	currentUser: Models.User<{}> | null;
	setCurrentUser: (user: Models.User<{}> | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState<Models.User<{}> | null>(null);

	useEffect(() => {
		const checkAuthentication = async () => {
			const { isAuthenticated, user } = await checkAuth();
			setIsAuthenticated(isAuthenticated);
			setCurrentUser(user ?? null);
		};

		checkAuthentication();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
