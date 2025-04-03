"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import createSession from "../actions/createSession";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

const LoginPage = () => {
	const [state, formAction] = useActionState(createSession, undefined);

	useEffect(() => {
		if (state?.error) toast.error(state.error);
		if (state?.success) {
			toast.success("Logged in successfully!");
		}
	}, [state]);
	return (
		<div className="flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
				<form action={formAction}>
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Login
					</h2>

					<div className="mb-4">
						<input
							type="email"
							id="email"
							name="email"
							className="border rounded w-full py-2 px-3"
							required
						/>
						<div className="space-y-2 min-w-[300px]">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-2"
							>
								Email
							</label>
							<div className="flex rounded-lg shadow-sm shadow-black/5">
								<Input
									type="email"
									id="email"
									name="email"
									className="-me-px rounded-e-none shadow-none focus-visible:z-10"
									placeholder="google"
								/>
								<div className="relative inline-flex">
									<select
										className="peer inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
										aria-label="Domain suffix"
									>
										<option>s.msumain.edu.ph</option>
										<option>gmail.com</option>
										<option>icloud.com</option>
									</select>
									<span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
										<ChevronDown
											size={16}
											strokeWidth={2}
											aria-hidden="true"
											role="img"
										/>
									</span>
								</div>
							</div>
						</div>
					</div>

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
							className="border rounded w-full py-2 px-3"
						/>
					</div>

					<div className="flex flex-col gap-5">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							Login
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
