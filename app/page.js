"use client";

import { useState } from "react";

const MEETING_TYPES = [
  { value: "work", label: "Work" },
  { value: "school", label: "School" },
  { value: "personal", label: "Personal" },
  { value: "remote", label: "Remote" },
  { value: "client", label: "Client" },
  { value: "other", label: "Other" },
];

export default function Home() {
  const [location, setLocation] = useState("");
  const [meetingType, setMeetingType] = useState("work");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit