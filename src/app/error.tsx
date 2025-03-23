'use client';

import { AlertTriangle } from 'lucide-react';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full space-y-6 bg-card p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-destructive" size={64} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-foreground">Oops! Something went wrong.</h1>

        <p className="text-muted-foreground">We encountered an unexpected error.</p>
      </div>
    </div>
  );
}
