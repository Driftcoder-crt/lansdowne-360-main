# eZee Absolute PMS Integration Guide

This document explains how the AI 360° Hotel platform integrates with **eZee Absolute PMS** and how to set it up in any environment.

---

## 1 · Architecture Overview

```
Guest Website  ─┬─▶ Next.js API Routes ─┬─▶  Booking Engine  ─┬─▶  eZee REST API
                │                     │                    │
Admin Panel   ─┘                      │                    └─▶  SQLite (local cache)
```

1. `lib/ezee-client.ts` – lightweight REST client with token-based auth.
2. `lib/booking-engine.ts` – orchestration layer (availability + booking).
3. API routes under `app/api` expose endpoints for the frontend & admin:
   * `POST /api/bookings/availability` – live room availability.
   * `POST /api/bookings/create` – reserve room + create local record.
   * `POST /api/ezee/sync-booking` – internal sync helper.
4. Admin config UI at `/admin/integrations/ezee` updates credentials in the `system_settings` table.
5. Webhooks from eZee call `/api/ezee/webhook` (HMAC-verified) → data stored for audit and further processing.

## 2 · Environment Variables

| Variable | Description |
| -------- | ----------- |
| `EZEE_API_BASE_URL` | Base URL (usually `https://live.ipms247.com/pmsint/api`) |
| `EZEE_HOTEL_CODE`   | Hotel/property code provided by eZee |
| `EZEE_USERNAME`     | API username |
| `EZEE_PASSWORD`     | API password |
| `EZEE_WEBHOOK_SECRET` | Shared secret for verifying webhook signatures |

All of these can be overridden/stored securely via the Admin → Integrations → eZee screen (they are persisted in the `system_settings` table).

## 3 · Database Changes

A new table is created when the app starts (see `lib/database.ts`):

```sql
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category VARCHAR(100) NOT NULL,
  key      VARCHAR(100) NOT NULL,
  value    TEXT,
  encrypted BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);
```

Usage:
* `category = 'ezee'`   → credentials & integration config
* `category = 'ezee_webhook'` → raw webhook payloads for audit

## 4 · Admin Panel

Navigate to **/admin/integrations/ezee**. The screen allows:

1. Entering / editing PMS credentials.
2. Testing the connection (calls `/api/admin/integrations/ezee/test`).
3. Viewing basic status & recent webhook events.

The sidebar item can be added to `components/admin/admin-sidebar.tsx` if desired.

## 5 · Webhooks

* Endpoint: `POST /api/ezee/webhook`
* Header: `x-ezee-signature: <sha256-hmac>`
* Payload: JSON with an `eventType` field among others.

Signature is verified using `EZEE_WEBHOOK_SECRET` (from env or DB). Invalid signatures return **401**.

## 6 · Extending the Integration

* Add more methods to `lib/ezee-client.ts` as per eZee's API spec.
* Process webhook events (e.g., `booking.updated`) by inserting / updating local tables.
* Switch from SQLite to PostgreSQL/MySQL for production scalability.

## 7 · Troubleshooting

| Issue | Solution |
| ----- | -------- |
| `eZee auth failed 401` | Verify username / password / hotel code in Admin UI. |
| `Invalid signature` during webhook | Ensure `EZEE_WEBHOOK_SECRET` matches secret configured in eZee dashboard. |
| No availability returned | Confirm correct Room-Type IDs and date range; check PMS inventory. |

## 8 · Resources

* eZee Absolute API docs (request from eZee support).
* AI 360° Hotel codebase – `lib/ezee-client.ts` is a template for adding new endpoints.

---
© 2024 AI 360° Hotel