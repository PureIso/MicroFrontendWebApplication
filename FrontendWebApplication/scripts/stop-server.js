const { exec } = require('child_process');
const os = require('os');

function killProcessByPort(port) {
  const platform = os.platform();
  console.log(`Checking for process on port ${port}...`);

  if (platform === 'win32') {
    exec(`netstat -ano | findstr :${port}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error('Error finding process:', err || stderr);
        return;
      }
      console.log('netstat output:', stdout);
      const lines = stdout.split('\n');
      let pidFound = false;

      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        const state = parts[3];
        const pidMatch = parts[4];
        if (state === 'LISTENING' && pidMatch) {
          const pid = parseInt(pidMatch, 10);
          if (pid) {
            console.log(`Found process with PID: ${pid}`);
            killWindowsProcess(pid);
            pidFound = true;
          }
        }
      });

      if (!pidFound) {
        console.log(`No process found running on port ${port}`);
      }
    });
  } else {
    exec(`lsof -t -i:${port}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error('Error finding process:', err || stderr);
        return;
      }
      console.log('lsof output:', stdout);
      const pids = stdout.trim().split('\n');
      if (pids.length > 0) {
        pids.forEach((pid) => {
          console.log(`Found process with PID: ${pid}`);
          killUnixProcess(pid);
        });
      } else {
        console.log(`No process found running on port ${port}`);
      }
    });
  }
}

function killWindowsProcess(pid) {
  exec(`taskkill /F /PID ${pid}`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error killing process:', err);
    } else {
      console.log(`Windows: Process killed with PID ${pid}`);
    }
  });
}

function killUnixProcess(pid) {
  exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error killing process:', err);
    } else {
      console.log(`Unix: Process killed with PID ${pid}`);
    }
  });
}

killProcessByPort(4200);