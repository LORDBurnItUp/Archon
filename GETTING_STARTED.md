# Getting Started with Archon - Local Setup

This guide will help you get Archon up and running on your machine without Docker.

## 📍 Installation Location

Archon is installed at: `/home/user/Archon`

**All commands below assume you start from this directory.** If you're elsewhere, navigate there first:
```bash
cd /home/user/Archon
```

## ⚡ Quick Start (Easiest Way)

**Terminal 1 - Backend:**
```bash
cd /home/user/Archon
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
cd /home/user/Archon
./start-frontend.sh
```

Then open **http://localhost:3737** in your browser!

---

## ✅ What's Already Done

- ✅ Python dependencies installed (uv)
- ✅ Frontend dependencies installed (npm)
- ✅ Environment files created (.env)
- ✅ Local development configuration set

## 🔑 Required Configuration

Before you can run Archon, you **MUST** configure your Supabase connection:

### 1. Get Your Supabase Credentials

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **service_role key** (⚠️ NOT the anon key!)

### 2. Update Your .env File

Edit `.env` in the Archon root directory and add your credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**✅ Already configured!** Your Supabase credentials are set:
- URL: `https://hrxcozkkhbnnhlpltuef.supabase.co`
- Service key: Configured ✓

⚠️ **CRITICAL**: Use the **service_role** key, not the anon key! The service_role key is longer and required for all save operations.

### 3. Set Up Supabase Database (First Time Only)

Run the database setup script in your Supabase SQL Editor:

1. In Supabase dashboard, go to **SQL Editor**
2. Find and run the `credentials_setup.sql` script from the Archon repository
3. This creates the necessary tables and credentials management

## 🚀 Running Archon Locally

Since Docker is not available, you'll run services locally in separate terminals.

### Option 1: Basic Setup (Backend + Frontend)

**Terminal 1 - Backend Server:**
```bash
cd python
uv run python -m src.server.main
```
This starts the main API server on http://localhost:8181

**Terminal 2 - Frontend:**
```bash
cd archon-ui-main
npm run dev
```
This starts the UI on http://localhost:3737

### Option 2: Full Setup with MCP (3 Terminals)

**Terminal 1 - Backend Server:**
```bash
cd python
uv run python -m src.server.main
```

**Terminal 2 - MCP Server:**
```bash
cd python
uv run python -m src.mcp_server.main
```
This starts the MCP server on http://localhost:8051

**Terminal 3 - Frontend:**
```bash
cd archon-ui-main
npm run dev
```

### Option 3: With Agent Work Orders (4 Terminals)

If you want to use the Agent Work Orders feature, you'll also need:

**Terminal 4 - Agent Work Orders Service:**
```bash
cd python
uv run python -m src.agent_work_orders.server
```

⚠️ **Note**: Agent Work Orders requires additional API keys:
- `ANTHROPIC_API_KEY` - Get from https://console.anthropic.com/
- `CLAUDE_CODE_OAUTH_TOKEN` - Generate in terminal
- `GITHUB_PAT_TOKEN` - Get from https://github.com/settings/tokens

## 🎯 Quick Start Commands

### Check Backend TypeScript/Lint Issues
```bash
cd python
uv run ruff check
uv run mypy src/
```

### Check Frontend Issues
```bash
cd archon-ui-main
npx tsc --noEmit
npm run biome:fix
npm run lint
```

### Run Tests
```bash
# Backend
cd python
uv run pytest

# Frontend
cd archon-ui-main
npm run test
```

## 📚 Next Steps

1. **Configure Supabase** (see above) - Required!
2. **Start the backend** in Terminal 1
3. **Start the frontend** in Terminal 2
4. **Open your browser** to http://localhost:3737
5. **Complete setup** in the Settings page (API keys, model choices, etc.)

## 🔧 Troubleshooting

### "Failed to save" or "Permission denied" errors
- You're using the anon key instead of the service_role key
- Update your .env with the correct service_role key

### "Connection refused" errors
- Make sure the backend is running on port 8181
- Check that no other services are using the required ports

### Port conflicts
- Default ports: 8181 (API), 8051 (MCP), 8052 (Agents), 8053 (Work Orders), 3737 (UI)
- Change ports in `.env` if needed

## 📖 Full Documentation

For comprehensive information about:
- Architecture
- Development workflows
- API patterns
- Testing strategies
- Code quality standards

See the main **CLAUDE.md** file in this repository.

## 🛠️ Development Workflow

### Making Changes

1. Make your code changes
2. Run linters: `make lint` (or separately for FE/BE)
3. Run tests: `make test` (or separately)
4. Commit changes: Follow git safety protocols in CLAUDE.md
5. Push to your branch: `git push -u origin <branch-name>`

### Current Branch

You're on: `claude/setup-archon-claude-md-K1Zoh`

Remember to push your changes to this branch!

## 📞 Need Help?

- Check the comprehensive **CLAUDE.md** for detailed documentation
- Review **PRPs/ai_docs/** for architecture and patterns
- Check the GitHub issues: https://github.com/coleam00/Archon/issues

---

**Ready to start?** Configure your Supabase credentials in `.env` and start the services!
