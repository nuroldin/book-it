import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	console.log(`Requested Page: ${pathname}`);

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/register"],
};
