import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory leads storage for quotes
interface QuoteLead {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  suburb: string;
  serviceType: string;
  estimatedArea: string;
  projectStage: string;
  notes?: string;
  createdAt: string;
}

const leads: QuoteLead[] = [];

// Health check endpoint for Cloud Run and container liveness probes
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Lead capture API endpoint
app.post('/api/quote', (req: Request, res: Response) => {
  try {
    const { fullName, phoneNumber, email, suburb, serviceType, estimatedArea, projectStage, notes } = req.body;
    if (!fullName || !phoneNumber) {
      res.status(400).json({ error: 'Name and phone number are required' });
      return;
    }

    const newLead: QuoteLead = {
      id: 'lead_' + Date.now(),
      fullName,
      phoneNumber,
      email,
      suburb: suburb || 'Cape Town',
      serviceType: serviceType || 'Concrete Floor Slabs',
      estimatedArea: estimatedArea || 'N/A',
      projectStage: projectStage || 'Standard',
      notes,
      createdAt: new Date().toISOString()
    };

    leads.push(newLead);
    console.log(`[Quote Lead Received] ${fullName} - ${phoneNumber} (${serviceType}) in ${suburb}`);

    res.status(201).json({ success: true, leadId: newLead.id });
  } catch (err) {
    console.error('Error processing quote lead:', err);
    res.status(500).json({ error: 'Internal server error processing quote' });
  }
});

// Serve static assets from Vite dist output
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Handle SPA routing: send index.html for all non-API requests
  app.get('*', (req: Request, res: Response) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
} else {
  // If dist is not yet built (e.g. running before build)
  app.get('/', (_req: Request, res: Response) => {
    res.send('Server running. Please run `npm run build` to generate client assets.');
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`SK Concrete Floor Services server running on http://0.0.0.0:${port}`);
});
