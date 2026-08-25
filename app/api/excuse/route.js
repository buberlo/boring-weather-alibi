import NextResponse from 'next/server';

import { insertEntry } from '../../../lib/db';
import { fetchWeather } from '../../../lib/weather';
import { computeOveruse } from '../../../lib/overuse';
import { generateExcuse } from '../../../lib/excuse';
import { buildCalendar } from '../../../lib/calendar';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_LOCATION_LENGTH = 100;
const MAX_MEETING_TYPE_LENGTH = 80;

function isString(value) {
  return typeof value === 'string';
}

function clampConfidence(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 70;
  return Math.max(0, Math.min(100, numeric));
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.' },
      { status: 400 }
    );
  }

  const location = isString(body.location) ? body.location.trim() : '';
  const meetingType = isString(body.meetingType) ? body.meetingType.trim() : '';

  if (!location) {
    return NextResponse.json(
      { error: 'Location is required.' },
      { status: 400 }
    );
  }

  if (!meetingType) {
    return NextResponse.json(
      { error: 'Meeting type is required.' },
      { status: 400 }
    );
  }

  if (
    location.length > MAX_LOCATION_LENGTH ||
    meetingType.length > MAX_MEETING_TYPE_LENGTH
  ) {
    return NextResponse.json(
      { error: 'Input is too long.' },
      { status: 400 }
    );
  }

  let weather;

  try {
    weather = await fetchWeather(location);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Weather lookup failed.',
        details: error.message,
      },
      { status: 502 }
    );
  }

  if (!weather || !weather.summary) {
    return NextResponse.json(
      { error: 'Unexpected weather response.' },
      {