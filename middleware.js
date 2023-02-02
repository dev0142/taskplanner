import { NextResponse } from "next/server";
import { useState } from "react";

export default function middleware(req) {
  let employeeVerification = req.cookies.get("EmployeeLoggedIn");
  let invalidPathRegexForEmployees = /^http:\/\/localhost:3000\/+[task?employees]+\/?[A-Za-z0-9]*?\/?$/;
  let url = req.url;
  let result = url.match(invalidPathRegexForEmployees);
  if (result && employeeVerification) {
    return NextResponse.redirect("http://localhost:3000/user/task");
  }
}
