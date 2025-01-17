import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { MODEL_DATA, PokemonData } from '@/app/data/battleData';

interface ScannerInterfaceProps {
  onComplete: (characterData: PokemonData) => void;
}

const ScannerInterface = ({ onComplete }: ScannerInterfaceProps) => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startScanning = async () => {
      try {
        setStatus('scanning');
        setProgress('Initializing camera...');

        const response = await fetch('/api/scan', { method: 'POST' });
        const data = await response.json();
        
        console.log('Scan response:', data);

        if (!data.success) {
          throw new Error(data.error || 'Scanning failed');
        }

        // Get the object name from the scan
        const normalizedObjectName = data.objectName.toLowerCase();
        console.log('Looking for object:', normalizedObjectName);
        console.log('Available objects:', Object.keys(MODEL_DATA));
        
        // Wait briefly to let the battleData.ts file update
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Try to fetch the updated data
        try {
          const { MODEL_DATA: updatedData } = await import('@/app/data/battleData');
          
          if (updatedData[normalizedObjectName]) {
            setProgress('Loading character data...');
            console.log('Found character data:', updatedData[normalizedObjectName]);
            onComplete(updatedData[normalizedObjectName]);
          } else {
            throw new Error('Character data not found');
          }
        } catch (error) {
          console.error('Error loading character data:', error);
          throw new Error('Failed to load character data');
        }
      } catch (err) {
        console.error('Scanning error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setStatus('error');
      }
    };

    startScanning();
  }, [onComplete]);

  if (status === 'error') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-red-900 p-8 rounded-lg text-white max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-700 rounded hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-green-900 p-8 rounded-lg text-white max-w-md text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">Scanning in Progress</h2>
        <p>{progress}</p>
      </div>
    </div>
  );
};

export default ScannerInterface;