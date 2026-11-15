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

interface ClientReviewRecord {
  id: string;
  author: string;
  role: string;
  companyOrSuburb: string;
  serviceType: string;
  rating: number;
  quote: string;
  date: string;
  source: 'Client Project' | 'Submitted Review';
}

const submittedReviews: ClientReviewRecord[] = [];

// Health check endpoint for Cloud Run and container liveness probes
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Client reviews API endpoints
app.get('/api/reviews', (_req: Request, res: Response) => {
  res.status(200).json({ reviews: submittedReviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  try {
    const { author, role, companyOrSuburb, serviceType, rating, quote } = req.body;
    const trimmedAuthor = typeof author === 'string' ? author.trim() : '';
    const trimmedQuote = typeof quote === 'string' ? quote.trim() : '';
    const numericRating = Number(rating);

    if (!trimmedAuthor || !trimmedQuote) {
      res.status(400).json({ error: 'Name and review comment are required.' });
      return;
    }

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5.' });
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

    const newReview: ClientReviewRecord = {
      id: 'rev_' + Date.now(),
      author: trimmedAuthor,
      role: typeof role === 'string' && role.trim() ? role.trim() : 'Property Owner',
      companyOrSuburb: typeof companyOrSuburb === 'string' && companyOrSuburb.trim() ? companyOrSuburb.trim() : 'Cape Town, Western Cape',
      serviceType: typeof serviceType === 'string' && serviceType.trim() ? serviceType.trim() : 'Concrete Floor Slabs',
      rating: Math.round(numericRating),
      quote: trimmedQuote,
      date: formattedDate,
      source: 'Submitted Review'
    };

    submittedReviews.unshift(newReview);
    res.status(201).json({ review: newReview });
  } catch (err) {
    console.error('Error processing review:', err);
    res.status(500).json({ error: 'Internal server error saving review.' });
  }
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
