import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1553dea5/health", (c) => {
  return c.json({ status: "ok" });
});

// RSVP Routes

// Submit RSVP
app.post("/make-server-1553dea5/rsvp", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, attendance, numberOfGuests, message } = body;

    // Validate required fields
    if (!name || !email || !attendance) {
      return c.json({ error: "Name, email, and attendance are required" }, 400);
    }

    // Create a unique ID for the RSVP using timestamp and email
    const rsvpId = `rsvp_${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, '')}`;
    
    const rsvpData = {
      id: rsvpId,
      name,
      email,
      phone: phone || '',
      attendance,
      numberOfGuests: numberOfGuests || 1,
      message: message || '',
      timestamp: new Date().toISOString(),
    };

    // Save to key-value store
    await kv.set(rsvpId, rsvpData);

    return c.json({ 
      success: true, 
      message: "RSVP submitted successfully",
      data: rsvpData 
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return c.json({ error: `Failed to submit RSVP: ${error.message}` }, 500);
  }
});

// Get all RSVPs
app.get("/make-server-1553dea5/rsvp", async (c) => {
  try {
    const rsvps = await kv.getByPrefix('rsvp_');
    return c.json({ 
      success: true, 
      count: rsvps.length,
      data: rsvps 
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return c.json({ error: `Failed to fetch RSVPs: ${error.message}` }, 500);
  }
});

// Get RSVP by email
app.get("/make-server-1553dea5/rsvp/:email", async (c) => {
  try {
    const email = c.req.param('email');
    const allRsvps = await kv.getByPrefix('rsvp_');
    const rsvp = allRsvps.find((r: any) => r.email === email);
    
    if (!rsvp) {
      return c.json({ error: "RSVP not found" }, 404);
    }

    return c.json({ 
      success: true, 
      data: rsvp 
    });
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return c.json({ error: `Failed to fetch RSVP: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);