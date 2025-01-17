import { NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

export async function POST() {
  try {
    const scriptPath = path.join(process.cwd(), 'full_pipeline.py');
    console.log('Starting Python script at:', scriptPath);
    
    const getPythonCommand = async (): Promise<string | null> => {
      return new Promise((resolve) => {
        const testProc = spawn('python3', ['--version']);
        
        testProc.on('error', () => {
          const testProc2 = spawn('python', ['--version']);
          
          testProc2.on('error', () => {
            resolve(null);
          });
          
          testProc2.on('close', (code) => {
            resolve(code === 0 ? 'python' : null);
          });
        });
        
        testProc.on('close', (code) => {
          resolve(code === 0 ? 'python3' : null);
        });
      });
    };

    const pythonCommand = await getPythonCommand();
    
    if (!pythonCommand) {
      console.error('Python not found in system PATH');
      return NextResponse.json(
        { error: 'Python not found. Please make sure Python is installed and in your system PATH.' },
        { status: 500 }
      );
    }

    return new Promise((resolve) => {
      console.log(`Using Python command: ${pythonCommand}`);
      const pythonProcess: ChildProcess = spawn(pythonCommand, [scriptPath]);
      
      let objectName = '';
      let output = '';
      
      if (pythonProcess.stdout) {
        pythonProcess.stdout.on('data', (data: Buffer) => {
          const newOutput = data.toString();
          output += newOutput;
          console.log('Python output:', newOutput);
          
          // Look for "Scanned object:" in the complete output
          const match = output.match(/Scanned object:\s*([^\n]+)/);
          if (match && match[1]) {
            objectName = match[1].trim().toLowerCase();
            console.log('Found object name:', objectName);
          }
        });
      }

      if (pythonProcess.stderr) {
        pythonProcess.stderr.on('data', (data: Buffer) => {
          console.error(`Python error: ${data.toString()}`);
        });
      }

      pythonProcess.on('close', (code: number | null) => {
        if (code !== 0) {
          return resolve(NextResponse.json(
            { error: 'Scanning failed' }, 
            { status: 500 }
          ));
        }

        // Clean up the object name
        objectName = objectName.replace(/[^a-zA-Z0-9 ]/g, '').trim();
        
        // Normalize object names
        const normalizations: Record<string, string> = {
          'cellphone': 'cell phone',
          'cell phone': 'cell phone',
        };
        
        const normalizedName = normalizations[objectName] || objectName;
        console.log('Normalized name:', normalizedName);

        return resolve(NextResponse.json({
          success: true,
          objectName: normalizedName
        }));
      });
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}