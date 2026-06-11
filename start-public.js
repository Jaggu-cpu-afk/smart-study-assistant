const localtunnel = require('localtunnel');
const fs = require('fs');
const { spawn } = require('child_process');

(async () => {
  try {
    console.log("-----------------------------------------");
    console.log("🌐 INITIALIZING PUBLIC TUNNELS...");
    console.log("-----------------------------------------");
    
    // 1. Start Backend Tunnel
    console.log("1. Creating public link for Backend Database (Port 5000)...");
    const backendTunnel = await localtunnel({ port: 5000 });
    console.log("   ✅ Backend URL: " + backendTunnel.url);

    // 2. Configure Frontend to point to the new Backend Tunnel
    console.log("2. Configuring frontend to point to the new public backend...");
    fs.writeFileSync('./client/.env', `VITE_API_URL=${backendTunnel.url}/api\n`);

    // 3. Start Frontend Vite Server (which will read the new .env)
    console.log("3. Booting up the Vite React server...");
    const viteProcess = spawn('npm', ['run', 'dev'], { cwd: './client', stdio: 'ignore', shell: true });

    // Give Vite 3 seconds to start up
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 4. Start Frontend Tunnel
    console.log("4. Creating public link for Frontend Website (Port 5173)...");
    const frontendTunnel = await localtunnel({ port: 5173 });

    console.log("\n\n");
    console.log("=====================================================");
    console.log("🚀 YOUR APP IS NOW LIVE ON THE PUBLIC INTERNET! 🚀");
    console.log("=====================================================");
    console.log("");
    console.log("Send this exact link to anyone:");
    console.log("👉 " + frontendTunnel.url);
    console.log("");
    console.log("⚠️ CRITICAL INSTRUCTION FOR VISITORS:");
    console.log("The very first time anyone opens this link, they will see a 'Localtunnel Warning' screen.");
    console.log("They MUST click the blue 'Click to Continue' button to access the site!");
    console.log("=====================================================");
    console.log("\n(Keep this terminal running. Closing it will destroy the public link.)");

    // Handle closing
    backendTunnel.on('close', () => console.log('Backend tunnel closed'));
    frontendTunnel.on('close', () => console.log('Frontend tunnel closed'));
    
    process.on('SIGINT', () => {
      console.log("\nShutting down public tunnels...");
      backendTunnel.close();
      frontendTunnel.close();
      viteProcess.kill();
      process.exit();
    });

  } catch (error) {
    console.error("Failed to start tunnels:", error);
  }
})();
