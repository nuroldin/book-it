"use client";
import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import createSession from "../actions/createSession";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { AtSign, ChevronDown } from "lucide-react";

const LoginPage = () => {
	const [state, formAction] = useActionState(createSession, undefined);
	const [isPending, startTransition] = useTransition(); // Initialize transition
	const [username, setUsername] = useState("");
	const [domain, setDomain] = useState("s.msumain.edu.ph");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	);

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent default form submission

		// Reset previous errors
		setErrors({});

		// Combine email
		const fullEmail = `${username}@${domain}`;
		let validationErrors: { email?: string; password?: string } = {};

		// Validate email
		if (!username.trim()) {
			validationErrors.email = "Email is required.";
		}

		// Validate password
		if (!password.trim()) {
			validationErrors.password = "Password is required.";
		}

		// If there are validation errors, show them and stop submission
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		// Create formData with the full email
		const formData = new FormData(e.currentTarget);
		formData.set("email", fullEmail); // Set combined email

		// Submit using startTransition
		startTransition(() => {
			formAction(formData);
		});
	};

	// Show success/error messages from server response
	useEffect(() => {
		if (state?.error) toast.error(state.error);
		if (state?.success) toast.success("Logged in successfully!");
	}, [state]);

	return (
		<div className="flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
				<form onSubmit={handleSubmit}>
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Login
					</h2>

					{/* Email Input */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-bold mb-2"
						>
							Email
						</label>
						<div className="flex rounded-lg shadow-sm shadow-black/5">
							<Input
								type="text"
								id="email"
								className={`-me-px rounded-e-none shadow-none focus-visible:z-10 ${
									errors.email ? "border-red-500" : ""
								}`}
								placeholder="pimping.nu72"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
									<AtSign size={16} strokeWidth={2} aria-hidden="true" />
								</div>
								<select
									className={`peer inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border border-input bg-background pe-8 ps-3 pl-9 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
										errors.email ? "border-red-500" : ""
									}`}
									aria-label="Domain suffix"
									value={domain}
									onChange={(e) => setDomain(e.target.value)}
								>
									<option>s.msumain.edu.ph</option>
									<option>gmail.com</option>
									<option>icloud.com</option>
								</select>
								<span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
									<ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
								</span>
							</div>
						</div>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email}</p>
						)}
					</div>

					{/* Password Input */}
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-bold mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className={`border rounded-lg w-full py-2 px-3 ${
								errors.password ? "border-red-500" : ""
							}`}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">{errors.password}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className="flex flex-col gap-5">
						<button
							type="submit"
							className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
								isPending ? "opacity-50 cursor-not-allowed" : ""
							}`}
							disabled={isPending}
						>
							{isPending ? "Logging in..." : "Login"}
						</button>

						<p>
							No account?&nbsp;
							<Link href="/register" className="text-blue-500">
								Register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
